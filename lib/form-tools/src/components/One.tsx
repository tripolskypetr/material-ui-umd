
/// <reference path="../components/index.ts"/>
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

  export namespace components {

    const useStyles = makeStyles({
      hidden: {
        display: 'none',
      },
    });

    namespace internal {

      const waitReady = (f) => Boolean(f.name);

      export const One = ({
        fields, ready,
        prefix = 'root',
        fallback = null,
        handler = () => ({}),
        change = () => null,
        focus = null,
        blur = null,
      }: IOneProps) => {
        const [object, setObject] = useResolved(handler, fallback, fields);
        const waitingReady = useRef(fields.filter(waitReady).length);
        const onChange = (v) => {
          setObject(v);
          change(v);
        };
        const onReady = () => {
          if (--waitingReady.current === -1) {
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
          {LoadPlaceholder}
        </Fragment>
      )
    }

  } // namespace components

} // namespace form
