
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
      inputType = 'text',
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        value={value} error={invalid !== null} disabled={disabled} type={inputType}
        onChange={({target}) => onChange(target.value)} label={title}
        style={{paddingBottom: '10px'}} />
    ), false);

  } // namespace fields

} // namespace form
