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
      stepSlider = 10,
      marksSlider = true,
      onChange,
    }) => (
      <Grid container spacing={2}>
        {leadingIcon && <Grid item>
          {createIcon(leadingIcon)}
        </Grid>}
        <Grid item xs>
          <Box ml={1} mr={1} display="flex" justifyContent="flex-start">
            <Box flexGrow="1" flexShrink="1" maxWidth="calc(100% - 15px)">
              <Slider step={stepSlider} marks={marksSlider} min={minSlider} max={maxSlider}
                aria-labelledby="discrete-slider" valueLabelDisplay="auto"
                value={value} onChange={(e, v) => onChange(v)} />
            </Box>
          </Box>
        </Grid>
        {trailingIcon && <Grid item>
          {createIcon(trailingIcon)}
        </Grid>}
      </Grid>
    ));

  } // namespace fields

} // namespace form
