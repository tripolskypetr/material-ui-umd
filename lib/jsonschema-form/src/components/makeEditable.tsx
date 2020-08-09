
/// <reference path="./Group.tsx"/>
/// <reference path="../utils/get.ts"/>

namespace form {

  const {
    useRef,
    useState,
    useEffect,
  } = React;

  const {
    makeStyles,
  } = material.core;

  const {
    get, set,
    deepClone,
    deepCompare,
  } = utils;

  export namespace components {

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

    /**
     *  - Оборачивает IEntity в удобную абстракцию IManaged, где сразу
     * представлены invalid, disabled, visible и можно задваивать вызов onChange
     *  - Отличается от makeSelectable наличием вызова isInvalid после изменения,
     * подразумевается, что в выбираемом поле не может быть ошибки
     */
    export const makeEditable = (Component: material.Component<IManaged>) => ({
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
      readonly = false,
      ...otherProps
    }: IEntity) => {

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
      const [invalid, setInvalid] = useState(null);
      const [visible, setVisible] = useState(true);

      const inputUpdate = useRef(false);

      const [value, setValue] = useState(null);

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
            throw new Error(`One error invalid name specified "${name}"`);
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

      const onChange = (newValue) => {
        if (readonly) {
          return;
        }
        setValue(newValue);
      };

      const managedProps: IManaged = {
        value, disabled, invalid, onChange,
        className: classes.stretch,
        ...otherProps
      };

      return (
        <Group className={classNames(className, classes.root, {
          [classes.hidden]: !visible
        })} {...groupProps}>
          <Component {...managedProps} />
        </Group>
      );
    };
  };

} // namespace components
