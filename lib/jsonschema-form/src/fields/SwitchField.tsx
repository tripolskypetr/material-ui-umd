
/// <reference path="../components/makeSelectable.tsx"/>

namespace form {

  const {
    makeSelectable,
  } = components;

  const {
    Switch,
    FormGroup,
    FormControlLabel,
  } = material.core;

  export namespace fields {

    export const SwitchField = makeSelectable(({
      className, disabled, value, onChange, title
    }) => (
      <FormGroup>
        <FormControlLabel className={className}
          control={<Switch disabled={disabled} checked={value} onChange={() => onChange(!value)} />}
          label={title} />
      </FormGroup>
    ));

  } // namespace fields

} // namespace form
