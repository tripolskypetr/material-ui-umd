
/// <reference path="../components/index.ts"/>
/// <reference path="../common/index.ts"/>
/// <reference path="../fields/index.ts"/>
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    Paper,
    Table,
    Toolbar,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableSortLabel,
    TableContainer,
    makeStyles,
  } = material.core;

  const {
    createField,
  } = fields;

  const {
    error,
  } = utils;

  const {
    useState,
    useCallback,
  } = React;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      container: {
        flexGrow: 1,
      },
      headerCell: {
        position: 'sticky',
        background: theme.palette.background.paper,
        top: '0',
      }
    }));

    const defaultFieldProps: Partial<IEntity> = {
      readonly: true,
      outlined: false,
      columns: '12',
      title: '',
      description: '',
      phoneColumns: '',
      tabletColumns: '',
      desktopColumns: '',
      change: () => error('List component field change raised'),
    };

    export const List = ({
      handler, fields, prefix,
      LoadPlaceholder = null,
      click, className,
      ...otherProps
    }: IListProps) => {

      const classes = useStyles();

      const [order, setOrder] = useState<'' | 'asc' | 'desc'>('');
      const [orderBy, setOrderBy] = useState('');

      const [objects] = useResolved(handler);

      const onOrder = useCallback((name) => {
        if (name === orderBy) {
          setOrder((order) => order === '' ? 'desc' : order === 'desc' ? 'asc' : '');
        } else {
          setOrderBy(name);
          setOrder('');
        }
      }, [order, orderBy]);

      if (objects === null) {
        return LoadPlaceholder;
      } else {
        return (
          <Paper className={classNames(classes.root, className)} {...otherProps}>
            <Toolbar>
            </Toolbar>
            <TableContainer className={classes.container}>
              <Table>
                <TableHead>
                  <TableRow>
                    {fields.map(({title, name}) => (
                      <TableCell className={classes.headerCell} key={name} sortDirection={orderBy === name ? order : false}>
                        <TableSortLabel direction={orderBy === name ? order : 'asc'}
                          active={orderBy === name && order} onClick={() => onOrder(name)}>
                          {title}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {objects.map((object, index) => (
                    <TableRow key={index}>
                      {fields.map((field, name) => {
                        const entity: IEntity = {...field, ...defaultFieldProps, object};
                        return (
                          <TableCell key={name}>
                            {createField(entity)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );
      }
    };

  } // namespace components

} // namespace form
