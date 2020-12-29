
/// <reference path="../components/makeField.tsx"/>
/// <reference path="../utils/createIcon.ts"/>

namespace form {

  const {
    TextField: MatTextField,
    InputAdornment,
    IconButton,
  } = material.core;

  const {
    makeField,
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

    export interface ITextFieldProps {
      invalid: PickProp<IManaged, 'invalid'>;
      value: PickProp<IManaged, 'value'>;
      disabled: PickProp<IManaged, 'disabled'>;
      inputType: PickProp<IManaged, 'inputType'>;
      description: PickProp<IManaged, 'description'>;
      outlined: PickProp<IManaged, 'outlined'>;
      title: PickProp<IManaged, 'title'>;
      leadingIcon: PickProp<IManaged, 'leadingIcon'>;
      trailingIcon: PickProp<IManaged, 'trailingIcon'>;
      leadingIconClick: PickProp<IManaged, 'leadingIconClick'>;
      trailingIconClick: PickProp<IManaged, 'trailingIconClick'>;
      inputRows: PickProp<IManaged, 'inputRows'>;
      placeholder: PickProp<IManaged, 'placeholder'>;
      onChange: PickProp<IManaged, 'onChange'>;
    }

    export const TextField = makeField(({
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
    }: ITextFieldProps) => (
      <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
        InputProps={icons(li, ti, lic, tic, value, onChange)} type={inputType}
        value={value} error={invalid !== null} placeholder={placeholder}
        onChange={({target}) => onChange(target.value.toString())}
        label={title} disabled={disabled} {...multiline(rows)}/>
    ), false);

  } // namespace fields

} // namespace form
