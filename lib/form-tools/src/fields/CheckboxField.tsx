
/// <reference path="../components/makeField.tsx"/>

namespace form {

  const {
    Checkbox,
    FormGroup,
    FormControlLabel,
  } = material.core;

  const {
    makeField
  } = components;

  export namespace fields {

    export interface ICheckboxFieldProps {
      disabled: PickProp<IManaged, 'disabled'>;
      value: PickProp<IManaged, 'value'>;
      onChange: PickProp<IManaged, 'onChange'>;
      title: PickProp<IManaged, 'title'>;
    }

    export const CheckboxField = makeField(({
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
