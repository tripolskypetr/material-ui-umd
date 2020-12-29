
/// <reference path="../components/makeField.tsx"/>

namespace form {

  const {
    makeField,
  } = components;

  const {
    Box,
    Switch,
    Typography,
  } = material.core;

  export namespace fields {

    export interface ISwitchFieldProps {
      disabled: PickProp<IManaged, 'disabled'>;
      value: PickProp<IManaged, 'value'>;
      onChange: PickProp<IManaged, 'onChange'>;
      title: PickProp<IManaged, 'title'>;
    }

    export const SwitchField = makeField(({
      disabled, value, onChange, title
    }: ISwitchFieldProps) => (
      <Box display="flex" alignItems="center">
        <Box flex={1}>
          <Typography variant="body1">
            {title}
          </Typography>
        </Box>
        <Switch disabled={disabled} checked={value} onChange={() => onChange(!value)} />
      </Box>
    ), true);

  } // namespace fields

} // namespace form
