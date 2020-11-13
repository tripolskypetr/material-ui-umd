namespace form {

  const {
    LinearProgress: MatLinearProgress,
    ThemeProvider,
    Typography,
    Box,
  } = material.core;

  const {
    createMuiTheme,
  } = material.core;

  const {
    round,
    min,
    max,
  } = Math;

  const {
    useState,
    useLayoutEffect,
    createElement: h,
  } = React;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    const percent = (v, m) => min(100, round((max(Number(v), 0) / m) * 100));

    const LinearProgress = ({
      value,
      progressColor,
      progressBarColor,
    }) => {
      const progress = h(MatLinearProgress, {value,
        variant: "determinate"
      });
      if (progressColor && progressBarColor) {
        const [patched, setPatched] = useState(null);
        useLayoutEffect(() => {
          const theme = createMuiTheme({
            overrides: {
              MuiLinearProgress: {
                colorPrimary: {
                  backgroundColor: progressColor(value),
                },
                barColorPrimary: {
                  backgroundColor: progressBarColor(value),
                },
              }
            }
          });
          /**
           * Конструкция позволяет дождаться применения всех эффектов, а затем дополнительно
           * запустить таймер - операция дорогая по производительности!
           */
          const timeout = setTimeout(() => setPatched(h(ThemeProvider, {theme}, progress)), 450);
          return () => clearTimeout(timeout);
        }, [value]);
        return patched;
      } else {
        return progress;
      }
    };

    export const ProgressField = makeManaged(({
      progressBarColor = null,
      progressColor = null,
      description = '',
      maxPercent = 1.0,
      value,
    }) => (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress value={percent(value, maxPercent)}
            progressBarColor={progressBarColor}
            progressColor={progressColor} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {description || `${percent(value, maxPercent)}%`}
          </Typography>
        </Box>
      </Box>
    ));

  } // namespace fields

} // namespace form
