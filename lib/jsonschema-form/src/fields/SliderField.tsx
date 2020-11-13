namespace form {

  const {
    Box,
    Grid,
    Slider,
    IconButton,
  } = material.core;

  const {
    makeManaged,
  } = components;

  const {
    createIcon: icon,
  } = utils;

  export namespace fields {

    const createIcon = (icn, value, onChange, click, edge) => (
      <IconButton onClick={() => {
        if (click) {
          click(value, onChange)
        }
      }} edge={edge}>
        { icon(icn) }
      </IconButton>
    );

    export const SliderField = makeManaged(({
      value,
      leadingIcon: li = null,
      trailingIcon: ti = null,
      leadingIconClick: lic = null,
      trailingIconClick: tic = null,
      minSlider = 0,
      maxSlider = 100,
      stepSlider,
      onChange,
    }) => (
      <Box mr={1}>
        <Grid alignItems="center" container spacing={2}>
          <Grid item>
            { li && createIcon(li, value, onChange, lic, 'end')}
          </Grid>
          <Grid item xs>
            <Slider step={stepSlider} marks={!!stepSlider} min={minSlider} max={maxSlider}
              aria-labelledby="discrete-slider" valueLabelDisplay="auto"
              value={value} onChange={({}, v) => onChange(v)} />
          </Grid>
          <Grid item>
            { ti && createIcon(ti, value, onChange, tic, 'start')}
          </Grid>
        </Grid>
      </Box>
    ));

  } // namespace fields

} // namespace form
