
/// <reference path="../components/Group.tsx"/>
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    Radio,
    FormGroup,
    RadioGroup,
    FormControlLabel,
    makeStyles,
  } = material.core;

  const {
    useState,
    useEffect,
    useRef,
  } = React;

  const {
    Group,
  } = components;

  const {
    get, set,
    deepClone,
    deepCompare
  } = utils;

  export namespace fields {

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

    export const RadioField = ({
      title = '',
      className = '',
      columns = '',
      radioValue = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      isDisabled = () => false,
      isVisible = () => true,
      change = ({v}) => console.log({v}),
      object = {},
      name = '',
      readonly = false,
    }: IEntity) => {

      const classes = useStyles();

      const [disabled, setDisabled] = useState(false);
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
            throw new Error(`Radio error invalid name specified "${name}"`);
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

      const onChange = () => {
        if (readonly) {
          return;
        }
        setValue(radioValue);
      };

      return (
        <Group className={classNames(className, classes.root, {
          [classes.hidden]: !visible
        })} {...groupProps}>
          <FormGroup>
            <RadioGroup name={name} disabled={disabled} value={value} onChange={onChange}>
              <FormControlLabel value={radioValue} control={<Radio />} label={title} />
            </RadioGroup>
          </FormGroup>
        </Group>
      );
    }

  } // namespace fields

} // namespace form
