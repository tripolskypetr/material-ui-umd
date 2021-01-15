namespace form {

  export namespace utils {

    const isObject = (item) => item && typeof item === "object" && !Array.isArray(item);

    export const deepMerge = (target, ...sources) => {
      if (!sources.length) return target;
      const source = sources.shift();
      if (isObject(target) && isObject(source)) {
        for (const key in source) {
          if (Array.isArray(source[key])) {
            target[key] = source[key].slice(0);
          } else if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            deepMerge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
      return deepMerge(target, ...sources);
    };

  } // namespace utils

} // namespace form
