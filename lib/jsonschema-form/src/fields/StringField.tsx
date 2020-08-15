
/// <reference path="../components/makeEditable.tsx"/>

namespace form {

  const {
    TextField: MatTextField,
  } = material.core;

  const {
    makeEditable
  } = components;

  export namespace fields {

    export const StringField = makeEditable(({
      invalid, value, disabled,
      outlined = true,
      title = '',
      description = '',
      defaultValue = '',
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        value={value || defaultValue} error={invalid !== null} disabled={disabled}
        onChange={({target}) => onChange(target.value)} label={title} />
    ));

  } // namespace fields

} // namespace form
