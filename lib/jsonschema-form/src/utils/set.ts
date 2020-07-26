namespace form {

  export namespace internal {

    export const set = (object, path, value) => {
      const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
      const pathArrayFlat = pathArray.flatMap(part => typeof part === 'string' ? part.split('.') : part);
      const parentPath = pathArrayFlat.slice(0, pathArrayFlat.length - 1);
      const parent = parentPath.reduce((obj, key) => obj && obj[key], object);
      const [name] = pathArrayFlat.reverse();
      return parent[name] = value;
    };

  } // namespace internal

} // namespace form
