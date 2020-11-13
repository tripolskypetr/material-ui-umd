namespace form {

  const {
    Box, Grid,
    IconButton,
    ThemeProvider,
    Slider: MatSlider,
  } = material.core;

  const {
    createElement: h,
  } = React;

  const {
    createMuiTheme,
  } = material.core;

  const {
    useDelayed
  } = components;

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

    const Slider = ({
      stepSlider,
      maxSlider = 100,
      minSlider = 0,
      onChange,
      value,
    }: any) => (
      <MatSlider step={stepSlider} marks={!!stepSlider} min={minSlider} max={maxSlider}
        aria-labelledby="discrete-slider" valueLabelDisplay="auto" color="primary"
        value={value} onChange={({}, v) => onChange(v)} />
    );

    const SliderColor = ({
      children = null,
      thumbColor,
      trackColor,
      railColor,
      value,
    }) => {
      if (thumbColor && trackColor && railColor) {
        return useDelayed(
          () => createMuiTheme({
            overrides: {
              MuiSlider: {
                thumb: { color: thumbColor(value) },
                track: { color: trackColor(value) },
                rail: { color: railColor(value) },
              }
            }
          }),
          (theme) => h(
            ThemeProvider,
            {theme},
            children
          ),
          [value]
        );
      } else {
        return children;
      }
    }

    export const SliderField = makeManaged(({
      value, onChange,
      leadingIcon: li = null,
      trailingIcon: ti = null,
      leadingIconClick: lic = null,
      trailingIconClick: tic = null,
      sliderThumbColor: thc = null,
      sliderTrackColor: trc = null,
      sliderRailColor: rc = null,
      ...otherProps
    }) => (
      <Box mr={1}>
        <Grid alignItems="center" container spacing={2}>
          <Grid item>
            { li && createIcon(li, value, onChange, lic, 'end') }
          </Grid>
          <Grid item xs>
            <SliderColor value={value} thumbColor={thc} trackColor={trc} railColor={rc}>
              <Slider {...otherProps} onChange={onChange} value={value}/>
            </SliderColor>
          </Grid>
          <Grid item>
            { ti && createIcon(ti, value, onChange, tic, 'start') }
          </Grid>
        </Grid>
      </Box>
    ));

  } // namespace fields

} // namespace form
