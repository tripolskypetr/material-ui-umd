
/// <reference path="../components/makeSelectable.tsx"/>

namespace form {

  const {
    makeSelectable,
  } = components;

  const {
    Radio,
    FormGroup,
    RadioGroup,
    FormControlLabel,
  } = material.core;

  export namespace fields {

    export const RadioField = makeSelectable(({
      disabled, value, onChange, title, radioValue
    }) => (
      <FormGroup>
        <RadioGroup name={name} disabled={disabled} value={value} onChange={() => onChange(radioValue)}>
          <FormControlLabel value={radioValue} control={<Radio />} label={title} />
        </RadioGroup>
      </FormGroup>
    ));

  } // namespace fields

} // namespace form
