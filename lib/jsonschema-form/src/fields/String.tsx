
/// <reference path="../utils/index.ts"/>
/// <reference path="../components/Group.tsx"/>

namespace form {

  const {
    TextField,
    makeStyles,
  } = material.core;

  const {
    useEffect,
    useState,
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

      /**
       * Эффект входящего изменения.
       */
      useEffect(() => {
        setDisabled(isDisabled(object));
        setVisible(isVisible(object));
        setInvalid(isInvalid(object));
        setValue(get(object, name));
      }, [object]);

      /**
       * Эффект исходящего изменения. Осуществляет валидацию,
       * нужно ли пробрасывать изменение исходя из коллбека
       * isInvalid.
       */
      useEffect(() => {
        const copy = deepClone(object);
        const check = set(copy, name, value);
        const invalid = isInvalid(copy);
        setInvalid(invalid);
        if (isNullOrUndefined(check) || !name) {
          throw new Error(`String error invalid name specified "${name}"`);
        } else if (invalid !== null) {
          return;
        } else if (!deepCompare(object, copy)) {
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
          [classes.hidden]: !visible
        })} {...groupProps}>
          <TextField helperText={invalid || description} error={invalid !== null}
            value={value} className={classes.stretch} variant="outlined"
            disabled={disabled} onChange={onChange} label={title} />
        </Group>
      );
    };

  } // namespace internal

} // namespace form
