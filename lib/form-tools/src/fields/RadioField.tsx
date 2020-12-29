
/// <reference path="../components/makeField.tsx"/>

namespace form {

  const {
    makeField,
  } = components;

  const {
    Radio,
    FormGroup,
    RadioGroup,
    FormControlLabel,
  } = material.core;

  export namespace fields {

    export interface IRadioFieldProps {
      disabled: PickProp<IManaged, 'disabled'>;
      value: PickProp<IManaged, 'value'>;
      onChange: PickProp<IManaged, 'onChange'>;
      title: PickProp<IManaged, 'title'>;
      radioValue: PickProp<IManaged, 'radioValue'>;
    }

    export const RadioField = makeField(({
      disabled, value, onChange, title, radioValue
    }: IRadioFieldProps) => (
      <FormGroup>
        <RadioGroup name={name} disabled={disabled} value={value} onChange={() => onChange(radioValue)}>
          <FormControlLabel value={radioValue} control={<Radio />} label={title} />
        </RadioGroup>
      </FormGroup>
    ), true);

  } // namespace fields

} // namespace form
