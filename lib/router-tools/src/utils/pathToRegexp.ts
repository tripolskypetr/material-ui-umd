namespace router {

  export namespace utils {

    /**
     * Tokenize input string.
     */
    const lexer = (str) => {
        const tokens = [];
        let i = 0;
        while (i < str.length) {
            const char = str[i];
            if (char === "*" || char === "+" || char === "?") {
                tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
                continue;
            }
            if (char === "\\") {
                tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
                continue;
            }
            if (char === "{") {
                tokens.push({ type: "OPEN", index: i, value: str[i++] });
                continue;
            }
            if (char === "}") {
                tokens.push({ type: "CLOSE", index: i, value: str[i++] });
                continue;
            }
            if (char === ":") {
                let name = "";
                let j = i + 1;
                while (j < str.length) {
                    const code = str.charCodeAt(j);
                    if (
                    // `0-9`
                    (code >= 48 && code <= 57) ||
                        // `A-Z`
                        (code >= 65 && code <= 90) ||
                        // `a-z`
                        (code >= 97 && code <= 122) ||
                        // `_`
                        code === 95) {
                        name += str[j++];
                        continue;
                    }
                    break;
                }
                if (!name)
                    throw new TypeError("Missing parameter name at " + i);
                tokens.push({ type: "NAME", index: i, value: name });
                i = j;
                continue;
            }
            if (char === "(") {
                let count = 1;
                let pattern = "";
                let j = i + 1;
                if (str[j] === "?") {
                    throw new TypeError("Pattern cannot start with \"?\" at " + j);
                }
                while (j < str.length) {
                    if (str[j] === "\\") {
                        pattern += str[j++] + str[j++];
                        continue;
                    }
                    if (str[j] === ")") {
                        count--;
                        if (count === 0) {
                            j++;
                            break;
                        }
                    }
                    else if (str[j] === "(") {
                        count++;
                        if (str[j + 1] !== "?") {
                            throw new TypeError("Capturing groups are not allowed at " + j);
                        }
                    }
                    pattern += str[j++];
                }
                if (count)
                    throw new TypeError("Unbalanced pattern at " + i);
                if (!pattern)
                    throw new TypeError("Missing pattern at " + i);
                tokens.push({ type: "PATTERN", index: i, value: pattern });
                i = j;
                continue;
            }
            tokens.push({ type: "CHAR", index: i, value: str[i++] });
        }
        tokens.push({ type: "END", index: i, value: "" });
        return tokens;
    };

    /**
     * Parse a string for the raw tokens.
     */
    const parse = (str, options) => {
        if (options === void 0) { options = {}; }
        const tokens = lexer(str);
        const _a = options.prefixes;
        const prefixes = _a === void 0 ? "./" : _a;
        const defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
        const result = [];
        let key = 0;
        let i = 0;
        let path = "";
        const tryConsume = (type) => {
            if (i < tokens.length && tokens[i].type === type)
                return tokens[i++].value;
        };
        const mustConsume = (type) => {
            const value = tryConsume(type);
            if (value !== undefined)
                return value;
            const _a = tokens[i]
            const nextType = _a.type;
            const index = _a.index;
            throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
        };
        const consumeText = () => {
            let result = "";
            let value;
            // tslint:disable-next-line
            while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
                result += value;
            }
            return result;
        };
        while (i < tokens.length) {
            const char = tryConsume("CHAR");
            const name = tryConsume("NAME");
            const pattern = tryConsume("PATTERN");
            if (name || pattern) {
                let prefix = char || "";
                if (prefixes.indexOf(prefix) === -1) {
                    path += prefix;
                    prefix = "";
                }
                if (path) {
                    result.push(path);
                    path = "";
                }
                result.push({
                    name: name || key++,
                    prefix,
                    suffix: "",
                    pattern: pattern || defaultPattern,
                    modifier: tryConsume("MODIFIER") || ""
                });
                continue;
            }
            const value = char || tryConsume("ESCAPED_CHAR");
            if (value) {
                path += value;
                continue;
            }
            if (path) {
                result.push(path);
                path = "";
            }
            const open = tryConsume("OPEN");
            if (open) {
                const prefix = consumeText();
                const name_1 = tryConsume("NAME") || "";
                const pattern_1 = tryConsume("PATTERN") || "";
                const suffix = consumeText();
                mustConsume("CLOSE");
                result.push({
                    name: name_1 || (pattern_1 ? key++ : ""),
                    pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                    prefix,
                    suffix,
                    modifier: tryConsume("MODIFIER") || ""
                });
                continue;
            }
            mustConsume("END");
        }
        return result;
    };

    /**
     * Compile a string to a template function for the path.
     */
    const compile = (str, options) => {
        return tokensToFunction(parse(str, options), options);
    };

    /**
     * Expose a method for transforming tokens into the path function.
     */
    const tokensToFunction = (tokens, options) => {
        if (options === void 0) { options = {}; }
        const reFlags = flags(options);
        const _a = options.encode
        const encode = _a === void 0 ? (x) => x : _a;
        const _b = options.validate;
        const validate = _b === void 0 ? true : _b;
        // Compile all the tokens into regexps.
        const matches = tokens.map((token) => {
            if (typeof token === "object") {
                return new RegExp("^(?:" + token.pattern + ")$", reFlags);
            }
        });
        return (data) => {
            let path = "";
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (typeof token === "string") {
                    path += token;
                    continue;
                }
                const value = data ? data[token.name] : undefined;
                const optional = token.modifier === "?" || token.modifier === "*";
                const repeat = token.modifier === "*" || token.modifier === "+";
                if (Array.isArray(value)) {
                    if (!repeat) {
                        throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                    }
                    if (value.length === 0) {
                        if (optional)
                            continue;
                        throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                    }
                    // tslint:disable-next-line: prefer-for-of
                    for (let j = 0; j < value.length; j++) {
                        const segment = encode(value[j], token);
                        if (validate && !matches[i].test(segment)) {
                            throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                        }
                        path += token.prefix + segment + token.suffix;
                    }
                    continue;
                }
                if (typeof value === "string" || typeof value === "number") {
                    const segment = encode(String(value), token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                    continue;
                }
                if (optional)
                    continue;
                const typeOfMessage = repeat ? "an array" : "a string";
                throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
            }
            return path;
        };
    }

    /**
     * Create path match function from `path-to-regexp` spec.
     */
    const match = (str, options) => {
        const keys = [];
        const re = pathToRegexp(str, keys, options);
        return regexpToFunction(re, keys, options);
    }

    /**
     * Create a path match function from `path-to-regexp` output.
     */
    const regexpToFunction = (re, keys, options) => {
        if (options === void 0) { options = {}; }
        const _a = options.decode
        const decode = _a === void 0 ? (x) => x : _a;
        return (pathname) => {
            const m = re.exec(pathname);
            if (!m)
                return false;
            const path = m[0];
            const index = m.index;
            const params = Object.create(null);
            const _loop_1 = (i) => {
                // tslint:disable-next-line
                if (m[i] === undefined)
                    return "continue";
                const key = keys[i - 1];
                if (key.modifier === "*" || key.modifier === "+") {
                    params[key.name] = m[i].split(key.prefix + key.suffix).map((value) => {
                        return decode(value, key);
                    });
                }
                else {
                    params[key.name] = decode(m[i], key);
                }
            };
            for (let i = 1; i < m.length; i++) {
                _loop_1(i);
            }
            return { path, index, params };
        };
    }

    /**
     * Escape a regular expression string.
     */
    const escapeString = (str) => {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    /**
     * Get the flags for a regexp from the options.
     */
    const flags = (options) => {
        return options && options.sensitive ? "" : "i";
    }
    /**
     * Pull out keys from a regexp.
     */
    const regexpToRegexp = (path, keys) => {
        if (!keys)
            return path;
        // Use a negative lookahead to match only capturing groups.
        const groups = path.source.match(/\((?!\?)/g);
        if (groups) {
            for (let i = 0; i < groups.length; i++) {
                keys.push({
                    name: i,
                    prefix: "",
                    suffix: "",
                    modifier: "",
                    pattern: ""
                });
            }
        }
        return path;
    }

    /**
     * Transform an array into a regexp.
     */
    const arrayToRegexp = (paths, keys, options) => {
        const parts = paths.map((path) => { return pathToRegexp(path, keys, options).source; });
        return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }

    /**
     * Create a path regexp from string input.
     */
    const stringToRegexp = (path, keys, options) => {
        return tokensToRegexp(parse(path, options), keys, options);
    }

    /**
     * Expose a function for taking tokens and returning a RegExp.
     */
    const tokensToRegexp = (tokens, keys, options) => {
        if (options === void 0) { options = {}; }
        const _a = options.strict
        const strict = _a === void 0 ? false : _a;
        const _b = options.start;
        const start = _b === void 0 ? true : _b
        const _c = options.end
        const end = _c === void 0 ? true : _c
        const _d = options.encode
        const encode = _d === void 0 ? (x) => x : _d;
        const endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
        const delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
        let route = start ? "^" : "";
        // Iterate over the tokens and create our regexp string.
        for (let _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            const token = tokens_1[_i];
            if (typeof token === "string") {
                route += escapeString(encode(token));
            }
            else {
                const prefix = escapeString(encode(token.prefix));
                const suffix = escapeString(encode(token.suffix));
                if (token.pattern) {
                    if (keys)
                        keys.push(token);
                    if (prefix || suffix) {
                        if (token.modifier === "+" || token.modifier === "*") {
                            const mod = token.modifier === "*" ? "?" : "";
                            route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                        }
                        else {
                            route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                        }
                    }
                    else {
                        route += "(" + token.pattern + ")" + token.modifier;
                    }
                }
                else {
                    route += "(?:" + prefix + suffix + ")" + token.modifier;
                }
            }
        }
        if (end) {
            if (!strict)
                route += delimiter + "?";
            route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
        }
        else {
            const endToken = tokens[tokens.length - 1];
            const isEndDelimited = typeof endToken === "string"
                ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
                : // tslint:disable-next-line
                    endToken === undefined;
            if (!strict) {
                route += "(?:" + delimiter + "(?=" + endsWith + "))?";
            }
            if (!isEndDelimited) {
                route += "(?=" + delimiter + "|" + endsWith + ")";
            }
        }
        return new RegExp(route, flags(options));
    }

    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */
    export const pathToRegexp = (path, keys, options?) => {
        if (path instanceof RegExp)
            return regexpToRegexp(path, keys);
        if (Array.isArray(path))
            return arrayToRegexp(path, keys, options);
        return stringToRegexp(path, keys, options);
    }


  } // namespace utils

} // namespace router
