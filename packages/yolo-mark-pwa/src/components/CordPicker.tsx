namespace mark {

  const {
    TableContainer,
    TableFooter,
    IconButton,
    TextField,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Table,
    Paper,
    Grid,
  } = material.core;

  const {
    makeStyles,
  } = material.styles;

  const {
    CropLandscape,
    CropSquare,
    Palette,
    Publish,
    Delete,
    Save,
  } = material.icons;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      header: {
        background: theme.palette.background.level2,
        color: theme.palette.text.primary,
      },
      transparent: {
        background: 'transparent'
      },
    }));

    export const CordPicker = ({
      cords = [
        {
          id: 'uuid',
          type: 'rect',
          color: 'cyan',
          name: 'unset',
          top: 10,
          left: 10,
          height: 100,
          width: 100,
        }
      ],
      onSave = () => console.log('save'),
      onLoad = () => console.log('load'),
      onDelete = (id) => console.log({ id }),
      onAddRect = () => console.log('add rect'),
      onAddSquare = () => console.log('add square'),
      onNameChanged = (id, name) => console.log({ name, id }),
    }) => {
      const classes = useStyles();
      const onChange = (id, { target }) => {
        const { value } = target;
        onNameChanged(id, value);
      };
      return (
        <TableContainer component={Paper}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.transparent} align="left">Color</TableCell>
                <TableCell className={classes.transparent} align="left">Name</TableCell>
                <TableCell className={classes.transparent} align="center">Type</TableCell>
                <TableCell className={classes.transparent} align="center">Top</TableCell>
                <TableCell className={classes.transparent} align="center">Left</TableCell>
                <TableCell className={classes.transparent} align="center">Height</TableCell>
                <TableCell className={classes.transparent} align="center">Width</TableCell>
                <TableCell className={classes.transparent} align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cords.map(({ id, type, top, left, height, width, color, name }) => (
                <TableRow key={id}>
                  <TableCell align="left" component="th" scope="row">
                    <IconButton>
                      <Palette style={{color}}/>
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    <TextField onChange={(e) => onChange(id, e)} value={name} label="Some class" />
                  </TableCell>
                  <TableCell align="center">{type}</TableCell>
                  <TableCell align="center">{top}</TableCell>
                  <TableCell align="center">{left}</TableCell>
                  <TableCell align="center">{height}</TableCell>
                  <TableCell align="center">{width}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onDelete(id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align="left">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button startIcon={<Save />} onClick={onSave} size="small" variant="outlined" color="primary">
                        Save markup
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<Publish />} onClick={onLoad} size="small" variant="outlined" color="primary">
                        Load markup
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<CropLandscape />} onClick={onAddRect} size="small" variant="outlined" color="secondary">
                        Add rect
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<CropSquare />} onClick={onAddSquare} size="small" variant="outlined" color="secondary">
                        Add square
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      );
    };

  } // namespace components

} // namespace mark
