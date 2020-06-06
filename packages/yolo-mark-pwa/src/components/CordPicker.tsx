namespace mark {

  const {
    TableContainer,
    TableFooter,
    IconButton,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Table,
    Paper,
  } = material.core;

  const {
    makeStyles,
  } = material.styles;

  const {
    Delete
  } = material.icons;

  const useStyles = makeStyles((theme) => ({
    header: {
      background: theme.palette.background.level2,
      color: theme.palette.text.primary,
    },
    transparent: {
      background: 'transparent'
    },
  }));

  export namespace components {

    export const CordPicker = ({
      cords = [
        {
          id: 'uuid',
          type: 'rect',
          top: 10,
          left: 10,
          height: 100,
          width: 100,
        }
      ],
      onSave = () => console.log('save'),
      onDelete = (id) => console.log({id}),
      onAddRect = () => console.log('add rect'),
      onAddSquare = () => console.log('add square'),
    }) => {
      const classes = useStyles();
      return (
        <TableContainer component={Paper}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.transparent} align="left">Type of figure</TableCell>
                <TableCell className={classes.transparent} align="left">Top margin</TableCell>
                <TableCell className={classes.transparent} align="left">Left margin</TableCell>
                <TableCell className={classes.transparent} align="left">Height</TableCell>
                <TableCell className={classes.transparent} align="left">Width</TableCell>
                <TableCell className={classes.transparent} align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cords.map(({id, type, top, left, height, width}) => (
                <TableRow key={id}>
                  <TableCell align="left" component="th" scope="row">{type}</TableCell>
                  <TableCell align="center">{top}</TableCell>
                  <TableCell align="center">{left}</TableCell>
                  <TableCell align="center">{height}</TableCell>
                  <TableCell align="center">{width}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onDelete(id)}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="left">
                  <Button onClick={onSave} size="small" variant="outlined" color="primary">
                    Save markup
                  </Button>
                </TableCell>
                {[...new Array(3)].reduce((acm) => [...acm, acm.length], []).map((i) => <TableCell key={i}/>)}
                <TableCell align="right">
                  <Button onClick={onAddRect} size="small" variant="outlined" color="secondary">
                    Add rect
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={onAddSquare} size="small" variant="outlined" color="secondary">
                    Add square
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      );
    };

  } // namespace components

} // namespace mark
