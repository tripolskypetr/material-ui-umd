namespace form {

  export namespace utils {

    export const initialValue = (type: FieldType) => {
      if (type === FieldType.Checkbox) {
        return false;
      } else if (type === FieldType.Radio) {
        return "";
      } else if (type === FieldType.String) {
        return "";
      } else if (type === FieldType.Switch) {
        return false;
      } else {
        console.warn('jsonschema-form initialValue unknown type');
        return "";
      }
    };

  } // namespace utils

} // namespace scene
