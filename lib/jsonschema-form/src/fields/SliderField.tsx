namespace form {

  const {
    Box, Grid,
    IconButton,
    ThemeProvider,
    Slider: MatSlider,
  } = material.core;

  const {
    createElement: h,
    useLayoutEffect,
    useState,
  } = React;

  const {
    createMuiTheme,
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
        const [patched, setPatched] = useState(null);
        useLayoutEffect(() => {
          const theme = createMuiTheme({
            overrides: {
              MuiSlider: {
                thumb: { color: thumbColor(value) },
                track: { color: trackColor(value) },
                rail: { color: railColor(value) },
              }
            }
          });
          /**
           * Конструкция позволяет дождаться применения всех эффектов, а затем дополнительно
           * запустить таймер - операция дорогая по производительности!
           */
          const timeout = setTimeout(() => setPatched(h(ThemeProvider, {theme}, children)), 450);
          return () => clearTimeout(timeout);
        }, [value]);
        return patched;
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
