namespace form {

  export namespace utils {

    export const create = (object, path) => {
      const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
      const pathArrayFlat = pathArray.flatMap(part => typeof part === 'string' ? part.split('.') : part);
      pathArrayFlat.reduce((obj, key) => obj[key] = obj[key] ? obj[key] : {}, object);
    };

  } // namespace utils

} // namespace form
