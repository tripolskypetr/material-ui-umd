
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    createElement: h,
  } = React;

  const {
    TextField: MatTextField,
    InputAdornment,
    Icon,
  } = material.core;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    const icon = (icon) => typeof icon === 'string'
      ? <Icon>{icon}</Icon>
      : h(icon);

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

    export const StringField = makeManaged(({
      invalid, value, disabled,
      inputType = 'text',
      description = '',
      outlined = true,
      title = '',
      leadingIcon = null,
      trailingIcon = null,
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        InputProps={icons(leadingIcon, trailingIcon)} value={value} error={invalid !== null}
        onChange={({target}) => onChange(target.value.toString())} label={title}
        disabled={disabled} type={inputType} style={{paddingBottom: '10px'}} />
    ), false);

  } // namespace fields

} // namespace form
