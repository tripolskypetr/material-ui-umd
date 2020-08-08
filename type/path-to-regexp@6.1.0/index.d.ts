
interface TokensToRegexpOptions {
    /**
     * When `true` the regexp will be case sensitive. (default: `false`)
     */
    sensitive?: boolean;
    /**
     * When `true` the regexp allows an optional trailing delimiter to match. (default: `false`)
     */
    strict?: boolean;
    /**
     * When `true` the regexp will match to the end of the string. (default: `true`)
     */
    end?: boolean;
    /**
     * When `true` the regexp will match from the beginning of the string. (default: `true`)
     */
    start?: boolean;
    /**
     * Sets the final character for non-ending optimistic matches. (default: `/`)
     */
    delimiter?: string;
    /**
     * List of characters that can also be "end" characters.
     */
    endsWith?: string;
    /**
     * Encode path tokens for use in the `RegExp`.
     */
    encode?: (value: string) => string;
}

interface ParseOptions {
    /**
     * Set the default delimiter for repeat parameters. (default: `'/'`)
     */
    delimiter?: string;
    /**
     * List of characters to automatically consider prefixes when parsing.
     */
    prefixes?: string;
}
  
/**
 * Metadata about a key.
 */
interface Key {
    name: string | number;
    prefix: string;
    suffix: string;
    pattern: string;
    modifier: string;
}

type Path = string | RegExp | Array<string | RegExp>;

declare function pathToRegexp(path: Path, keys?: Key[], options?: TokensToRegexpOptions & ParseOptions): RegExp;
