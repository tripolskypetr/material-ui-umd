
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    TextField: MatTextField,
  } = material.core;

  const {
    makeManaged
  } = components;

  export namespace fields {

    export const StringField = makeManaged(({
      invalid, value, disabled,
      outlined = true,
      title = '',
      description = '',
      defaultValue = '',
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        value={value || defaultValue} error={invalid !== null} disabled={disabled}
        onChange={({target}) => onChange(target.value)} label={title}
        style={{paddingBottom: '10px'}} />
    ), false);

  } // namespace fields

} // namespace form
