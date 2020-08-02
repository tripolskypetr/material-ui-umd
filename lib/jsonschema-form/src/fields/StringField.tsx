
/// <reference path="../utils/index.ts"/>
/// <reference path="../components/Group.tsx"/>

namespace form {

  const {
    TextField: MatTextField,
    makeStyles,
  } = material.core;

  const {
    useEffect,
    useState,
    useRef,
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

    export const StringField = ({
      title = '',
      description = '',
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      defaultValue = '',
      isDisabled = () => false,
      isVisible = () => true,
      isInvalid = () => null,
      change = ({v}) => console.log({v}),
      object = {},
      name = '',
      readonly = false,
      outlined = true,
    }: IEntity) => {

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
      const [invalid, setInvalid] = useState(null);
      const [visible, setVisible] = useState(true);

      const inputUpdate = useRef(false);

      const [value, setValue] = useState('');

      /**
       * Эффект входящего изменения.
       */
      useEffect(() => {
        const newValue = get(object, name);
        if (newValue !== value) {
          inputUpdate.current = true;
          setValue(newValue);
        }
        setDisabled(isDisabled(object));
        setVisible(isVisible(object));
        setInvalid(isInvalid(object));
      }, [object]);

      /**
       * Эффект исходящего изменения.
       */
      useEffect(() => {
        if (inputUpdate.current) {
          inputUpdate.current = false;
        } else {
          const copy = deepClone(object);
          const check = set(copy, name, value);
          const invalid = isInvalid(copy);
          setInvalid(invalid);
          if (!check || !name) {
            throw new Error(`String error invalid name specified "${name}"`);
          } else if (invalid !== null) {
            return;
          } else if (!deepCompare(object, copy)) {
            change(copy);
          }
        }
      }, [value]);

      const groupProps = {
        columns,
        phoneColumns,
        tabletColumns,
        desktopColumns,
      };

      const onChange = ({target}) => {
        if (readonly) {
          return;
        }
        const {value: newValue} = target;
        setValue(newValue);
      };

      return (
        <Group className={classNames(className, classes.root, {
          [classes.hidden]: !visible
        })} {...groupProps}>
          <MatTextField variant={outlined ? "outlined" : "standard"} helperText={invalid || description}
            value={value || defaultValue} className={classes.stretch} error={invalid !== null}
            disabled={disabled} onChange={onChange} label={title} />
        </Group>
      );
    };

  } // namespace internal

} // namespace form
