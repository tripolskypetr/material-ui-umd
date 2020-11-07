namespace form {

  const {
    Rating,
  } = material.lab;

  const {
    Box,
    Typography,
  } = material.core;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    export const RatingField = makeManaged(({
      value, disabled,
      readonly, title,
      onChange
    }) => (
      <Box display="flex" justifyContent="center"
        component="fieldset" borderColor="transparent">
        <Typography component="legend">{title}</Typography>
        <Rating onChange={({}, v) => onChange(v)}
          disabled={disabled} value={value}
          readOnly={readonly} />
      </Box>
    ));

  } // namespace fields

} // namespace form
