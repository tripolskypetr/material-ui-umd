namespace form {

  export namespace utils {

    const managed = new Set([
      FieldType.Checkbox,
      FieldType.Combo,
      FieldType.Component,
      FieldType.Items,
      FieldType.Progress,
      FieldType.Radio,
      FieldType.Rating,
      FieldType.Slider,
      FieldType.Switch,
      FieldType.Text,
    ]);

    export const isManaged = (type: FieldType) => managed.has(type);

  } // namespace utils

} // namespace form
