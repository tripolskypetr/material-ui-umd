
/// <reference path="../components/makeManaged.tsx"/>
/// <reference path="../utils/createIcon.ts"/>

namespace form {

  const {
    TextField: MatTextField,
    InputAdornment,
    IconButton,
  } = material.core;

  const {
    makeManaged,
  } = components;

  const {
    createIcon: icon,
  } = utils;

  export namespace fields {

    const icons = (leadingIcon, trailingIcon, leadingIconClick, trailingIconClick, v, c) => ({
      ...leadingIcon ? {startAdornment: (
        <InputAdornment position="start">
          <IconButton edge="start" onClick={() => {
            if (leadingIconClick) {
              leadingIconClick(v, (v) => c(v, true));
            }
          }}>
            { icon(leadingIcon) }
          </IconButton>
        </InputAdornment>
      )} : {},
      ...trailingIcon ? {endAdornment: (
        <InputAdornment position="end">
          <IconButton edge="end" onClick={() => {
            if (trailingIconClick) {
              trailingIconClick(v, (v) => c(v, true));
            }
          }}>
            { icon(trailingIcon) }
          </IconButton>
        </InputAdornment>
      )} : {},
    });

    const multiline = (inputRows) => ({
      multiline: inputRows > 1,
      rows: inputRows,
    });

    export const TextField = makeManaged(({
      invalid, value, disabled,
      inputType = 'text',
      description = '',
      outlined = true,
      title = '',
      leadingIcon: li = null,
      trailingIcon: ti = null,
      leadingIconClick: lic = null,
      trailingIconClick: tic = null,
      inputRows: rows = 1,
      placeholder = '',
      onChange
    }: IManaged) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        InputProps={icons(li, ti, lic, tic, value, onChange)} type={inputType}
        value={value} error={invalid !== null} placeholder={placeholder}
        onChange={({target}) => onChange(target.value.toString())}
        label={title} disabled={disabled} {...multiline(rows)}/>
    ), false);

  } // namespace fields

} // namespace form
