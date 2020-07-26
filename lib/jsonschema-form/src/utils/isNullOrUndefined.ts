namespace form {

  export namespace internal {

    export const isNullOrUndefined = (obj) => {
      return typeof obj === "undefined" || obj === null;
    };

  } // namespace internal

} // namespace form
