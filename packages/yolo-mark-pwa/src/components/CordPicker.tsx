namespace mark {

  const {
    TableContainer,
    TableFooter,
    IconButton,
    TextField,
    TableHead,
    TableCell,
    TableBody,
    Checkbox,
    TableRow,
    Button,
    Avatar,
    Table,
    Paper,
    Grid,
    Box
  } = material.core;

  const {
    makeStyles,
  } = material.styles;

  const {
    CropLandscape,
    CropSquare,
    CropFree,
    Palette,
    Publish,
    Delete,
    Crop,
    Save,
  } = material.icons;

  const {
    round
  } = Math;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      header: {
        background: theme.palette.background.level2,
        color: theme.palette.text.primary,
      },
      transparent: {
        background: 'transparent'
      },
      center: {
        alignItems: 'center',
        display: 'flex',
      }
    }));

    const applyCordsOrder = (cords) => {
      const roi = cords.find((c) => c.type === 'roi');
      const other = cords.filter((c) => c.type !== 'roi');
      return [...roi ? [roi] : [], ...other];
    };

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
      onCrop = (crop) => console.log({crop}),
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
              {applyCordsOrder(cords).map(({ id, type, top, left, height, width, color, name }) => (
                <TableRow key={id}>
                  <TableCell align="left" component="th" scope="row">
                    <Avatar style={{background: '#75757530'}}>
                      <Palette style={{color}}/>
                    </Avatar>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    <TextField disabled={type === 'roi'} onChange={(e) => onChange(id, e)} value={name} label="Some class" />
                  </TableCell>
                  <TableCell align="center">{type}</TableCell>
                  <TableCell align="center">{round(top)}</TableCell>
                  <TableCell align="center">{round(left)}</TableCell>
                  <TableCell align="center">{round(height)}</TableCell>
                  <TableCell align="center">{round(width)}</TableCell>
                  <TableCell align="right">
                    <IconButton disabled={type === 'roi'} onClick={() => onDelete(id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} align="left">
                  <Grid container direction="row" justify="stretch" spacing={2}>
                    <Grid item className={classes.center}>
                      <Button startIcon={<Save />} onClick={onSave} size="small" variant="outlined" color="primary">
                        Save markup
                      </Button>
                    </Grid>
                    <Grid item className={classes.center}>
                      <Button startIcon={<Publish />} onClick={onLoad} size="small" variant="outlined" color="primary">
                        Load markup
                      </Button>
                    </Grid>
                    <Grid item className={classes.center}>
                      <Button startIcon={<CropLandscape />} onClick={onAddRect} size="small" variant="outlined" color="secondary">
                        Add rect
                      </Button>
                    </Grid>
                    <Grid item className={classes.center}>
                      <Button startIcon={<CropSquare />} onClick={onAddSquare} size="small" variant="outlined" color="secondary">
                        Add square
                      </Button>
                    </Grid>
                    <Box flexGrow={1}/>
                    <Grid item className={classes.center}>
                      <Checkbox onChange={({target}) => onCrop(target.checked)} icon={<Crop />} checkedIcon={<CropFree />} />
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
