namespace form {

  export namespace utils {

    export const get = (object, path) => {
      const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
      const pathArrayFlat = pathArray.flatMap(part => typeof part === 'string' ? part.split('.') : part);
      return pathArrayFlat.reduce((obj, key) => obj && obj[key], object);
    }

  } // namespace utils

} // namespace form
