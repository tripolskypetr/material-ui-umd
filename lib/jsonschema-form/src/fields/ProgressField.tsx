namespace form {

  const {
    LinearProgress,
    Typography,
    Box,
  } = material.core;

  const {
    round,
    min,
    max,
  } = Math;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    const percent = (v, m) => min(100, round((max(Number(v), 0) / m) * 100))

    export const ProgressField = makeManaged(({value, maxPercent = 1.0}) => (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress value={percent(value, maxPercent)} variant="determinate" />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${percent(value, maxPercent)}%`}
          </Typography>
        </Box>
      </Box>
    ));

  } // namespace fields

} // namespace form
