
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

    export interface ICheckboxFieldProps {
      disabled: PickProp<IManaged, 'disabled'>;
      value: PickProp<IManaged, 'value'>;
      onChange: PickProp<IManaged, 'onChange'>;
      title: PickProp<IManaged, 'title'>;
    }

    export const CheckboxField = makeManaged(({
      disabled, value, onChange, title
    }: ICheckboxFieldProps) => (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox disabled={disabled} checked={value} onChange={() => onChange(!value)} />}
          label={title} />
      </FormGroup>
    ), true);

  } // namespace fields

} // namespace form
