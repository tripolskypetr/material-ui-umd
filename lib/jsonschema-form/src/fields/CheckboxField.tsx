
/// <reference path="../components/makeSelectable.tsx"/>

namespace form {

  const {
    Checkbox,
    FormGroup,
    FormControlLabel,
  } = material.core;

  const {
    makeSelectable
  } = components;

  export namespace fields {

    export const CheckboxField = makeSelectable(({
      disabled, value, onChange, title
    }) => (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox disabled={disabled} checked={value} onChange={() => onChange(!value)} />}
          label={title} />
      </FormGroup>
    ));

  } // namespace fields

} // namespace form
