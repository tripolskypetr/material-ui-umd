
/// <reference path="../components/makeManaged.tsx"/>
/// <reference path="../utils/createIcon.ts"/>

namespace form {

  const {
    TextField: MatTextField,
    InputAdornment,
  } = material.core;

  const {
    makeManaged,
  } = components;

  const {
    createIcon: icon,
  } = utils;

  export namespace fields {

    const icons = (leadingIcon, trailingIcon) => ({
      ...leadingIcon ? {startAdornment: (
        <InputAdornment position="start">
          { icon(leadingIcon) }
        </InputAdornment>
      )} : {},
      ...trailingIcon ? {endAdornment: (
        <InputAdornment position="end">
          { icon(trailingIcon) }
        </InputAdornment>
      )} : {},
    });

    export const TextField = makeManaged(({
      invalid, value, disabled,
      inputType = 'text',
      description = '',
      outlined = true,
      title = '',
      leadingIcon = null,
      trailingIcon = null,
      placeholder = '',
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        InputProps={icons(leadingIcon, trailingIcon)} value={value} error={invalid !== null}
        onChange={({target}) => onChange(target.value.toString())} placeholder={placeholder}
        label={title} disabled={disabled} type={inputType} />
    ), false);

  } // namespace fields

} // namespace form
