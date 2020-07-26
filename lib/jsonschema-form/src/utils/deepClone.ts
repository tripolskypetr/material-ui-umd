namespace form {

  export namespace internal {

    const isObject = (obj) => {
      const type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    };

    export const deepClone = (src) => {
      const target = {};
      for (const prop in src) {
        if (src.hasOwnProperty(prop)) {
          // if the value is a nested object, recursively copy all it's properties
          if (isObject(src[prop])) {
            target[prop] = deepClone(src[prop]);
          } else {
            target[prop] = src[prop];
          }
        }
      }
      return target;
    }

  } // namespace internal

} // namespace form
