
/// <reference path="../components/makeManaged.tsx"/>

namespace form {

  const {
    makeManaged,
  } = components;

  const {
    Box,
    Switch,
    Typography,
  } = material.core;

  export namespace fields {

    export const SwitchField = makeManaged(({
      disabled, value, onChange, title
    }) => (
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
