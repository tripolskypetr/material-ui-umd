namespace form {

  export namespace utils {

    export const flat = (arr: any[], fieldName = "fields"): any[] => arr.reduce((acm, val) =>
        Array.isArray(val[fieldName])
          ? acm.concat(val, flat(val[fieldName]))
          : acm.concat(val), [],
      );

  } // namespace utils

} // namespace scene
