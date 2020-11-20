namespace form {

  const {
    isArray,
  } = Array;

  export namespace utils {

    const isObject = (obj) => {
      const type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    };

    export const deepClone = (src) => {
      const target = {};
      for (const prop in src) {
        if (src.hasOwnProperty(prop)) {
          if (isArray(src[prop])) {
            /* TODO: нет поддержки копирования массивов объектов */
            target[prop] = src[prop].slice(0);
          } else if (isObject(src[prop])) {
            target[prop] = deepClone(src[prop]);
          } else {
            target[prop] = src[prop];
          }
        }
      }
      return target;
    }

  } // namespace utils

} // namespace form
