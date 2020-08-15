
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    makeManaged,
  } = components;

  const {
    Switch,
    FormGroup,
    FormControlLabel,
  } = material.core;

  export namespace fields {

    export const SwitchField = makeManaged(({
      disabled, value, onChange, title
    }) => (
      <FormGroup>
        <FormControlLabel
          control={<Switch disabled={disabled} checked={value} onChange={() => onChange(!value)} />}
          label={title} />
      </FormGroup>
    ), false);

  } // namespace fields

} // namespace form
