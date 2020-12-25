
/// <reference path="../common/index.ts"/>
/// <reference path="../fields/index.ts"/>

namespace form {

  const {
    Fragment,
  } = React;

  const {
    createElement: h,
  } = React;

  const {
    useState,
    useRef,
  } = React;

  const {
    createField,
  } = fields;

  const {
    useResolved,
  } = hooks;

  const {
    makeStyles,
  } = material.core;

  const {
    classNames,
    isManaged,
  } = utils;

  export namespace components {

    const useStyles = makeStyles({
      hidden: {
        display: 'none',
      },
    });

    namespace internal {

      /**
       * Мы отображаем корневой компонент только после инициализации
       * полей вложенных групп...
       */
      const countManaged = (fields) => {
        const total = fields?.filter(({type}) => isManaged(type)).length;
        if (total) {
          return total;
        } else {
          /* группа, вложенная в группу */
          return 1;
        }
      };

      export const One = ({
        fields, ready,
        prefix = 'root',
        fallback = null,
        handler = () => ({}),
        change = () => null,
        focus = null,
        blur = null,
      }: IOneProps) => {
        const waitingReady = useRef(countManaged(fields));
        const [object, setObject] = useResolved({
          handler, fallback, fields, change,
        });
        const onChange = (v) => {
          setObject(v);
          change(v);
        };
        const onReady = () => {
          if (--waitingReady.current === 0) {
            ready();
          }
        };
        if (object) {
          return (
            <Fragment>
              {fields?.map((field, index) => {
                const entity: IEntity = {
                  focus, blur,
                  ...field, object,
                  change: onChange,
                  ready: onReady,
                };
                const currentPath = `${prefix}.${field.type}[${index}]`;
                if (field.type === FieldType.Expansion) {
                  return (
                    <Expansion {...field} key={currentPath}>
                      <One ready={onReady} blur={blur} focus={focus}
                        prefix={currentPath} fields={field.fields}
                        handler={object} change={onChange} />
                    </Expansion>
                  );
                } else if (field.type === FieldType.Paper) {
                  return (
                    <Paper {...field} key={currentPath}>
                      <One ready={onReady} focus={focus} blur={blur}
                        prefix={currentPath} fields={field.fields}
                        handler={object} change={onChange} />
                    </Paper>
                  );
                } else if (field.type === FieldType.Group) {
                  return (
                    <Group {...field} key={currentPath}>
                      <One ready={onReady} focus={focus} blur={blur}
                        prefix={currentPath} fields={field.fields}
                        handler={object} change={onChange} />
                    </Group>
                  );
                } else {
                  return createField(entity, currentPath);
                }
              })}
            </Fragment>
          );
        } else {
          return null;
        }
      };

    } // namespace internal

    export const One = ({
      LoadPlaceholder = null,
      ready = () => null,
      ...props
    }: IOneProps) => {
      const [visible, setVisible] = useState(false);
      const classes = useStyles();
      const onReady = () => {
        setVisible(true);
        ready();
      };
      return (
        <Fragment>
          <Group className={classNames({[classes.hidden]: !visible})}>
            {h(internal.One, {...props, ready: onReady})}
          </Group>
          {!visible && LoadPlaceholder}
        </Fragment>
      )
    };

    /**
     * После написания формы можно включить строгую
     * проверку типов полей
     */
    export const OneTyped = (props: IOneTypedProps) => h(One, props);

    One.typed = OneTyped;

  } // namespace components

} // namespace form
