namespace reduxApp {

  const {
    Fragment
  } = React;

  const {
    Button,
    Typography,
    IconButton,
    Slider,
    TextField
  } = material.core;

  const {
    makeStyles
  } = material.styles;

  const {
    AddShoppingCart,
    Delete,
    Alarm,
    VolumeDown,
    VolumeUp,
  } = material.icons;

  const useStyles = makeStyles((theme) => ({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hero: {
      flexWrap: 'wrap',
      border: '1px solid #ffffff1f',
      borderRadius: '4px',
      marginBottom: '5px',
      padding: '24px',
      margin: '-1px',
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
      },
    },
    title: {
      paddingTop: '25px',
      paddingBottom: '10px',
    },
    subtitle: {
      paddingBottom: '15px',
    }
  }));

  export namespace pages {

    const Center = ({
      children = null
    }) => {
      const classes = useStyles();
      return (
        <div className={classes.center}>
          {children}
        </div>
      );
    }

    const Hero = ({
      children = null,
      title = "Buttons",
      group = false,
      subtitle = "Buttons communicate actions that users can take"
    }) => {
      const classes = useStyles();
      return (
        <Fragment>
          <Typography className={classes.title} variant={group ? "h2" : "h4"}>
            {title}
          </Typography>
          {!group && <Typography className={classes.subtitle} variant="body1">
            {subtitle}
          </Typography>}
          <div className={classNames({[classes.hero]: !group, [classes.center]: !group})}>
            {children}
          </div>
        </Fragment>
      );
    }

    export const ComponentsPage = () => (
      <Fragment>

        <Hero title="Buttons" group={true}>

          <Hero title="Contained Buttons" subtitle="Contained buttons are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.">
            <Button variant="contained">Default</Button>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" color="secondary">Secondary</Button>
            <Button variant="contained" disabled>Disabled</Button>
          </Hero>

          <Hero title="Text Buttons" subtitle="Text buttons are typically used for less-pronounced actions, including those located in dialogs or cards">
            <Button>Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button disabled>Disabled</Button>
          </Hero>

          <Hero title="Outlined Buttons" subtitle="Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.">
            <Button variant="outlined">Default</Button>
            <Button variant="outlined" color="primary">Primary</Button>
            <Button variant="outlined" color="secondary">Secondary</Button>
            <Button variant="outlined" disabled>Disabled</Button>
          </Hero>

          <Hero title="Icon Buttons" subtitle="Icon buttons are commonly found in app bars and toolbars.">
            <Center>
              <IconButton aria-label="delete">
                <Delete />
              </IconButton>
            </Center>
            <Center>
              <IconButton aria-label="delete" disabled color="primary">
                <Delete />
              </IconButton>
            </Center>
            <Center>
              <IconButton color="secondary" aria-label="add an alarm">
                <Alarm />
              </IconButton>
            </Center>
            <Center>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCart />
              </IconButton>
            </Center>
          </Hero>

        </Hero>

        <Hero title="Slider" group={true}>

          <Hero title="Continuous sliders" subtitle="Continuous sliders allow users to select a value along a subjective range.">
            <Slider aria-labelledby="continuous-slider" />
          </Hero>

          <Hero title="Discrete sliders" subtitle="Discrete sliders can be adjusted to a specific value by referencing its value indicator.">
            <Slider
              defaultValue={30}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}/>
          </Hero>

          <Hero title="Custom marks" subtitle="You can have custom marks by providing a rich array to the marks prop.">
            <Slider
              defaultValue={20}
              aria-labelledby="discrete-slider-custom"
              step={10}
              valueLabelDisplay="auto"
              marks={[
                {value: 0, label: '0°C'},
                {value: 20, label: '20°C'},
                {value: 37, label: '37°C'},
                {value: 100, label: '100°C',},
              ]}/>
          </Hero>

          <Hero title="Text Field" group={true}>

            <Hero title="TextField" subtitle="The TextField wrapper component is a complete form control including a label, input and help text.">
              <TextField label="Filled" variant="filled" />
              <TextField label="Outlined" variant="outlined" />
            </Hero>

          </Hero>

        </Hero>

      </Fragment>
    );

  } // namespace components

} // namespace reduxApp
