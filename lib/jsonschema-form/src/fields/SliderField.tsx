namespace form {

  const {
    Box,
    Grid,
    Slider,
  } = material.core;

  const {
    makeManaged,
  } = components;

  const {
    createIcon,
  } = utils;

  export namespace fields {

    export const SliderField = makeManaged(({
      value,
      leadingIcon = null,
      trailingIcon = null,
      minSlider = 0,
      maxSlider = 100,
      stepSlider,
      onChange,
    }) => (
      <Box mr={1}>
        <Grid container spacing={2}>
          <Grid item>
            {leadingIcon && createIcon(leadingIcon)}
          </Grid>
          <Grid item xs>
            <Slider step={stepSlider} marks={!!stepSlider} min={minSlider} max={maxSlider}
              aria-labelledby="discrete-slider" valueLabelDisplay="auto"
              value={value} onChange={(e, v) => onChange(v)} />
          </Grid>
          <Grid item>
            {trailingIcon && createIcon(trailingIcon)}
          </Grid>
        </Grid>
      </Box>
    ));

  } // namespace fields

} // namespace form
