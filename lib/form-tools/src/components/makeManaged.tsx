
/// <reference path="./Group.tsx"/>
/// <reference path="../utils/get.ts"/>
/// <reference path="../utils/wairForBlur.ts"/>

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
    waitForBlur,
  } = utils;

  const {
    useDebounce,
  } = useDebounceHook;

  export namespace components {

    const stretch = {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    };

    const useStyles = makeStyles({
      root: {
        ...stretch,
        '& > *': {
          ...stretch,
          flexGrow: 1,
        },
        '& > * > *': {
          flexGrow: 1,
        }
      },
      hidden: {
        display: 'none',
      },
    });

    /**
     *  - Оборачивает IEntity в удобную абстракцию IManaged, где сразу
     *    представлены invalid, disabled, visible и можно задваивать вызов onChange
     *  - Управляет фокусировкой, мануально ожидая потерю фокуса, эмулируя onBlur
     */
    export const makeManaged = (Component: material.Component<IManaged>, skipDebounce = false) => ({
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      isDisabled = () => false,
      isVisible = () => true,
      isInvalid = () => null,
      change = (v) => console.log({v}),
      ready = () => null,
      compute = null,
      object = {},
      name = '',
      focus = null,
      blur = null,
      readonly = false,
      style = null,
      ...otherProps
    }: IEntity) => {

      const groupRef = useRef(null);

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
      const [invalid, setInvalid] = useState(null);
      const [visible, setVisible] = useState(true);

      const inputUpdate = useRef(false);

      /**
       * Чтобы поле input было React-управляемым, нельзя
       * передавать в свойство value значение null
       */
      const [value, setValue] = useState(false);
      const [debouncedValue] = useDebounce(value, skipDebounce ? 0 : 600);

      /**
       * Эффект входящего изменения.
       */
      useEffect(() => {
        if (compute) {
          setValue(compute(object));
        } else {
          const newValue = get(object, name);
          if (newValue !== value) {
            inputUpdate.current = true;
            setValue(newValue);
          }
          setDisabled(isDisabled(object));
          setVisible(isVisible(object));
          setInvalid(isInvalid(object));
        }
        /**
         * Вызываем коллбек для подсчета компонентов, получивших
         * изменения. Важно при первой отрисовке, пока все не
         * получили целевой объект форма не отображается
         */
        ready();
      }, [object]);

      /**
       * Эффект исходящего изменения. Привязан на изменение
       * value, обернутое в хук useDebounce для оптимизации
       * производительности
       */
      useEffect(() => {
        if (inputUpdate.current) {
          inputUpdate.current = false;
        } else if (compute) {
          return;
        } else {
          const copy = deepClone(object);
          const check = set(copy, name, debouncedValue);
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
      }, [debouncedValue]);

      const groupProps = {
        columns,
        phoneColumns,
        tabletColumns,
        desktopColumns,
      };

      /**
       * Блокирует применение изменений,
       * если поле вычисляемое или только
       * на чтение
       */
      const onChange = (newValue) => {
        if (readonly) { return; }
        if (compute) { return; }
        setValue(newValue);
      };

      /**
       * Запускает механизм вещания фокусировки,
       * использует полифил для ожидания потери
       * фокуса
       */
      const onFocus = () => {
        if (blur) {
          waitForBlur(groupRef.current)
            .then(blur);
        }
        if (focus) {
          focus();
        }
      };

      const managedProps: IManaged = {
        value, disabled, invalid, onChange,
        ...otherProps
      };

      const hidden = {
        [classes.hidden]: !visible
      };

      return (
        <Group isItem={true} style={style} className={classNames(className, classes.root, hidden)}
          {...groupProps} onFocus={onFocus} ref={groupRef}>
          <Component {...managedProps} />
        </Group>
      );
    };
  };

} // namespace components
