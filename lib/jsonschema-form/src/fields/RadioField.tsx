
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    makeManaged,
  } = components;

  const {
    Radio,
    FormGroup,
    RadioGroup,
    FormControlLabel,
  } = material.core;

  export namespace fields {

    export const RadioField = makeManaged(({
      disabled, value, onChange, title, radioValue
    }) => (
      <FormGroup>
        <RadioGroup name={name} disabled={disabled} value={value} onChange={() => onChange(radioValue)}>
          <FormControlLabel value={radioValue} control={<Radio />} label={title} />
        </RadioGroup>
      </FormGroup>
    ), false);

  } // namespace fields

} // namespace form
