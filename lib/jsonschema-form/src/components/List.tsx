
/// <reference path="../components/index.ts"/>
/// <reference path="../common/index.ts"/>
/// <reference path="../fields/index.ts"/>
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableContainer,
    makeStyles,
  } = material.core;

  const {
    createField,
  } = fields;

  const {
    error,
  } = utils;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        width: '100%',
        height: '100%',
      },
      container: {
        flexGrow: 1,
      },
    }));

    const defaultFieldProps: Partial<IField> & {change: (obj: any) => void} = {
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

      const [objects] = useResolved(handler);

      if (objects === null) {
        return LoadPlaceholder;
      } else {
        return (
          <Paper className={classNames(classes.root, className)} {...otherProps}>
            <TableContainer className={classes.container}>
              <Table>
                <TableHead>
                  <TableRow>
                    {fields.map(({title, name}) => (
                      <TableCell key={name}>
                        {title}
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
