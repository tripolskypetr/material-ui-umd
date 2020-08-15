
/// <reference path="../fields/index.ts"/>
/// <reference path="../common/index.ts"/>
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    Box,
    Radio,
    Table,
    Checkbox,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    FormGroup,
    TextField,
    RadioGroup,
    IconButton,
    InputAdornment,
    TableSortLabel,
    TablePagination,
    FormControlLabel,
  } = material.core;

  const {
    Sync: SyncIcon,
    Edit: EditIcon,
    Delete: DeleteIcon,
    Search: SearchIcon,
  } = material.icons;

  const {
    makeStyles,
  } = material.core;

  const {
    useRef,
    useState,
    useEffect,
    useCallback,
  } = React;

  const {
    createField,
  } = fields;

  const {
    randomId,
  } = utils;

  export namespace components {

    const useStyles = makeStyles({
      root: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      },
      container: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
      },
      stretch: {
        flexGrow: 1,
        flexShrink: 1,
      },
      disabled: {
        pointerEvents: 'none',
        touchAction: 'none',
        opacity: 0.5,
      },
    });

    const ListHeader = ({
      fields = [],
      orderBy = '',
      order = '',
      selection = SelectionMode.None,
      onOrder = (name) => console.log({ name }),
    }) => (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <ListMark disabled={true} checked={false}
                  selection={selection} />
              </TableCell>
              {fields.map(({ title, name }) => (
                <TableCell key={name} sortDirection={orderBy === name ? order : false}>
                  <TableSortLabel direction={orderBy === name ? order : 'asc'}
                    active={orderBy === name && order} onClick={() => onOrder(name)}>
                    {title}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      );

    const ListToolbar = ({
      keyword = '',
      onKeyword = (keyword) => console.log({keyword}),
      onUpdate = () => console.log('update'),
    }) => {
      const styles = useStyles();
      const inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      };
      return (
        <Box className={styles.container}>
          <TextField label="Поиск" placeholder="Введите фразу для поиска" style={{minWidth: 'max(30%, 275px)'}}
            value={keyword} onChange={({target}) => onKeyword(target.value)} InputProps={inputProps} />
          <Box className={styles.stretch}/>
          <IconButton onClick={onUpdate}>
            <SyncIcon />
          </IconButton>
        </Box>
      );
    };

    const ListMark = ({
      selection = SelectionMode.None,
      line = 0,
      id = '',
      disabled = false,
      checked = false,
      onSelect = (line) => console.log({line}),
    }) => {
      const onChange = useCallback(() => onSelect(line), [line]);
      if (selection === SelectionMode.Multiple) {
        return (
          <RadioGroup name={id} onChange={onChange}>
            <FormControlLabel value={line} control={<Radio disabled={disabled} />} />
          </RadioGroup>
        );
      } else if (selection === SelectionMode.Single) {
        return (
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} disabled={disabled} onChange={onChange} />}/>
          </FormGroup>
        );
      } else if (selection === SelectionMode.None) {
        return (
          <FormGroup>
            <FormControlLabel control={<Checkbox disabled={true} />}/>
          </FormGroup>
        );
      } else {
        throw new Error('ListMark invalid selection mode');
      }
    };

    const ListContent = ({
      className = '',
      selections = new Set(),
      objects = [],
      fields = [],
      id = '',
      canDelete = true,
      canEdit = true,
      selection = SelectionMode.None,
      onDelete = (object) => console.log({ object }),
      onClick = (object) => console.log({ object }),
      onSelect = (line) => console.log({ line }),
    }) => (
        <Table className={className}>
          <TableBody>
            {objects.map((object, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <ListMark line={index} checked={selections.has(index)}
                    id={id} onSelect={onSelect} selection={selection} />
                </TableCell>
                {fields.map((field, name) => {
                  const entity: IEntity = {
                    ...field, object,
                    readonly: true,
                    outlined: true,
                  };
                  return (
                    <TableCell key={name} onClick={() => onClick(object)}>
                      {createField(entity)}
                    </TableCell>
                  );
                })}
                <TableCell align="right">
                  <IconButton disabled={!canDelete} onClick={() => onClick(object)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton disabled={!canEdit} onClick={() => onDelete(object)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    const ListFooter = ({
      limit = 10,
      offset = 50,
      total = 100,
      disabled = true,
      onChangeLimit = (offset) => console.log({offset}),
      onChangeOffset = (limit) => console.log({limit}),
    }) => {
      const classes = useStyles();
      return (
        <TablePagination
          className={classNames({[classes.disabled]: disabled})}
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={offset / limit}
          onChangePage={(e, newPage) => onChangeOffset(limit * newPage)}
          onChangeRowsPerPage={({target}) => onChangeLimit(target.value)}
        />
      );
    };

    export const List = ({
      className = '',
      fields = [],
      selection = SelectionMode.None,
      limit = 25,
      offset = 0,
      total = 100,
      canDelete = false,
      canEdit = false,
      select = (objects) => console.log({objects}),
      click = (object) => console.log({object}),
      remove = (object) => console.log({object}),
      handler = () => null,
      ...otherProps
    }: IListProps) => {

      const classes = useStyles();
      const id = useRef(randomId());

      const [keyword, setKeyword] = useState('');
      const [orderBy, setOrderBy] = useState('');
      const [objects, setObjects] = useState([]);
      const [loading, setLoading] = useState(true);
      const [order, setOrder] = useState<order>('');
      const [pagination, setPagination] = useState({limit, offset, total});
      const [selections, setSelections] = useState(new Set<number>());

      useEffect(() => setPagination({limit, offset, total}), [limit, offset, total]);

      const onOrder = useCallback((name) => {
        if (name === orderBy) {
          setOrder((order) => order === '' ? 'desc' : order === 'desc' ? 'asc' : '');
        } else {
          setOrderBy(name);
          setOrder('');
        }
      }, [order, orderBy]);

      const onSelect = useCallback((index: number) => {
        if (selections.has(index)) {
          selections.delete(index);
        } else {
          selections.add(index);
        }
        setSelections(selections);
        select(Array.from(selections).map((i) => objects[i]));
      }, [selections, pagination, objects]);

      const onUpdate = useCallback(() => {
        setLoading(true);
        const process = async () => {

          const props: IListHandlerInput = {
            keyword, order, orderBy, ...pagination
          };

          const getData = async () => {
            if (handler instanceof Promise) {
              return await handler(props);
            } else if (typeof handler === 'function') {
              return handler(props);
            } else {
              throw new Error('List handler not promise not function');
            }
          };

          const data = Object.assign(props, await getData()) as IListHandlerResult;

          setKeyword(data.keyword);
          setOrderBy(data.orderBy);
          setSelections(new Set());
          setObjects(data.items);
          setOrder(data.order);
          setPagination({limit: data.limit, offset: data.offset, total: data.total});

          setLoading(false);
          select([]);
        };
        process();
      }, [handler, keyword, order, orderBy, pagination]);

      const onDelete = async (obj) => {
        if (remove instanceof Promise) {
          await remove(obj);
        } else if (typeof remove === 'function') {
          remove(obj);
        } else {
          throw new Error('List remove not promise not function');
        }
        onUpdate();
      };

      useEffect(() => onUpdate(), [handler]);

      return (
        <Box className={classNames(className, classes.root, classes.container)} {...otherProps}>
          <ListToolbar onKeyword={(v) => setKeyword(v)}
            keyword={keyword} onUpdate={onUpdate} />
          <ListHeader onOrder={onOrder} order={order}
            orderBy={orderBy} fields={fields} />
          <ListContent
            fields={fields} className={classes.stretch}
            selections={selections} objects={objects}
            canDelete={canDelete} canEdit={canEdit}
            selection={selection} id={id.current}
            onClick={click} onSelect={onSelect}
            onDelete={onDelete} />
          <ListFooter onChangeOffset={(offset) => setPagination((p) => ({...p, offset}))}
            onChangeLimit={(limit) => setPagination((p) => ({...p, limit}))}
            disabled={loading || selections.size > 0} {...pagination} />
        </Box>
      );
    };

  } // namespace components

} // namespace form
