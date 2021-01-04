namespace form {

  export namespace utils {

    export const deepFlat = (arr = [], fieldName = "fields") => {
      const result = [];
      const process = (entries = []) => entries.forEach((entry) => {
        if (Array.isArray(entry[fieldName])) {
          process(entry[fieldName])
        }
        result.push(entry);
      });
      process(arr);
      return result;
    };

  } // namespace utils

} // namespace scene
