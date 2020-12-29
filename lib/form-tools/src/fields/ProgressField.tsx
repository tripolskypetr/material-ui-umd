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
    createElement: h,
  } = React;

  const {
    useDelayed,
  } = hooks;

  const {
    makeField,
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
        return useDelayed(
          () => createMuiTheme({
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
          }),
          (theme) => h(
            ThemeProvider,
            {theme},
            progress
          ),
          [value]
        );
      } else {
        return progress;
      }
    };

    export interface IProgressFieldProps {
      progressBarColor: PickProp<IManaged, 'progressBarColor'>;
      progressColor: PickProp<IManaged, 'progressColor'>;
      maxPercent: PickProp<IManaged, 'maxPercent'>;
      showPercentLabel: PickProp<IManaged, 'showPercentLabel'>;
      value: PickProp<IManaged, 'value'>;
    }

    export const ProgressField = makeField(({
      progressBarColor = null,
      progressColor = null,
      maxPercent = 1.0,
      showPercentLabel,
      value,
    }: IProgressFieldProps) => (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress value={percent(value, maxPercent)}
            progressBarColor={progressBarColor}
            progressColor={progressColor} />
        </Box>
        { showPercentLabel && <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${percent(value, maxPercent)}%`}
          </Typography>
        </Box> }
      </Box>
    ));

  } // namespace fields

} // namespace form
