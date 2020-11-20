namespace form {

  export namespace utils {

    export const flat = (arr, fieldName = "items") => arr.reduce((acm, val) =>
      Array.isArray(val[fieldName])
        ? acm.concat({...val, [fieldName]: []}, flat(val[fieldName]))
        : acm.concat(val), []);

    export const deepFlat = (arr, fieldName = "items") => {
      let result = arr;
      while (true) {
        const iter = flat(result, fieldName);
        if (result.length === iter.length) {
          return result;
        } else {
          result = iter;
        }
      }
    };

  } // namespace utils

} // namespace scene
