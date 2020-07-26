
/// <reference path="../utils/index.ts"/>
/// <reference path="../components/Group.tsx"/>

namespace form {

  const {
    TextField,
    makeStyles,
  } = material.core;

  const {
    useState,
    useEffect
  } = React;

  export namespace internal {

    const useStyles = makeStyles({
      root: {
        margin: 5,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
      },
      stretch: {
        flexGrow: 1,
      },
      hidden: {
        display: 'none',
      },
    });

    export const String = ({
      title = '',
      description = '',
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      isDisabled = () => false,
      isVisible = () => true,
      isInvalid = () => null,
      change = ({v}) => console.log({v}),
      object = {},
      name = '',
    }: IEntity) => {

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
      const [invalid, setInvalid] = useState(null);
      const [visible, setVisible] = useState(true);

      const [value, setValue] = useState('');

      useEffect(() => {
        setDisabled(isDisabled(object));
        setVisible(isVisible(object));
        setInvalid(isInvalid(object));
        setValue(get(object, name));
      }, [object]);

      useEffect(() => {
        const copy = Object.assign({}, object);
        const check = set(copy, name, value);
        const invalid = isInvalid(copy);
        if (isNullOrUndefined(check) || !name) {
          throw new Error('String error invalid name specified');
        } else if (invalid === null) {
          change(copy);
        }
      }, [value]);

      const groupProps = {
        columns,
        phoneColumns,
        tabletColumns,
        desktopColumns,
      };

      const onChange = ({target}) => {
        const {value} = target;
        setValue(value);
      };

      return (
        <Group className={classNames(className, classes.root, {
          [classes.visible]: visible
        })} {...groupProps}>
          <TextField helperText={invalid || description} error={invalid !== null}
            value={value} className={classes.stretch} variant="outlined"
            disabled={disabled} onChange={onChange} label={title} />
        </Group>
      );
    };

  } // namespace internal

} // namespace form
