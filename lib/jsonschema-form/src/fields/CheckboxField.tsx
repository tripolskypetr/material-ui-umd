
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    Checkbox,
    FormGroup,
    FormControlLabel,
  } = material.core;

  const {
    makeManaged
  } = components;

  export namespace fields {

    export const CheckboxField = makeManaged(({
      disabled, value, onChange, title
    }) => (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox disabled={disabled} checked={value} onChange={() => onChange(!value)} />}
          label={title} />
      </FormGroup>
    ), true);

  } // namespace fields

} // namespace form
