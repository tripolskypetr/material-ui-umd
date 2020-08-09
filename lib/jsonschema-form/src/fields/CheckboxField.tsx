
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
      className, disabled, value, onChange, title
    }) => (
      <FormGroup>
        <FormControlLabel className={className}
          control={<Checkbox disabled={disabled} checked={value} onChange={onChange} />}
          label={title} />
      </FormGroup>
    ))

  } // namespace fields

} // namespace form
