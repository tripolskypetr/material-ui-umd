
/// <reference path="./Group.tsx"/>
/// <reference path="../utils/get.ts"/>

namespace form {

  const {
    makeStyles,
  } = material.core;

  const {
    useState,
    useEffect,
    useRef,
  } = React;

  const {
    get, set,
    deepClone,
    deepCompare
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

    export const makeSelectable = (Component: material.Component<IManaged>) => ({
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      isDisabled = () => false,
      isVisible = () => true,
      isInvalid = () => null,
      change = ({ v }) => console.log({ v }),
      object = {},
      name = '',
      readonly = false,
      ...otherProps
    }: IEntity) => {

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
      const [visible, setVisible] = useState(true);

      const inputUpdate = useRef(false);

      const [value, setValue] = useState(false);

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
          if (!check || !name) {
            throw new Error(`Switch error invalid name specified "${name}"`);
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
        value, disabled, onChange,
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

  } // namespace components

} // namespace form
