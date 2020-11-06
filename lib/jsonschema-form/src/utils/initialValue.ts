namespace form {

  export namespace utils {

    export const initialValue = (type: FieldType) => {
      if (type === FieldType.Checkbox) {
        return false;
      } else if (type === FieldType.Radio) {
        return "";
      } else if (type === FieldType.Text) {
        return "";
      } else if (type === FieldType.Switch) {
        return false;
      } else if (type === FieldType.Progress) {
        return 1.0;
      } else if  (type === FieldType.Slider) {
        return 0;
      } else if (type === FieldType.Combo) {
        return null;
      } else if (type === FieldType.Items) {
        return [];
      } else {
        console.warn('jsonschema-form initialValue unknown type');
        return "";
      }
    };

  } // namespace utils

} // namespace scene
