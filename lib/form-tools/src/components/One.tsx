
/// <reference path="../components/index.ts"/>
/// <reference path="../common/index.ts"/>
/// <reference path="../fields/index.ts"/>

namespace form {

  const {
    Fragment,
  } = React;

  const {
    createField,
  } = fields;

  const {
    useResolved,
  } = hooks;

  export namespace components {

    export const One = ({
      fields,
      prefix = 'root',
      fallback = null,
      handler = () => ({}),
      change = () => null,
      focus = null,
      blur = null,
      LoadPlaceholder = null,
    }: IOneProps) => {
      const [object, setObject] = useResolved(handler, fallback, fields);
      const onChange = (v) => {
        setObject(v);
        change(v);
      };
      if (object === null) {
        return LoadPlaceholder;
      } else {
        return (
          <Fragment>
            {fields?.map((field, index) => {
              const entity: IEntity = {focus, blur, ...field, object, change: onChange};
              const currentPath = `${prefix}.${field.type}[${index}]`;
              if (field.type === FieldType.Expansion) {
                return (
                  <Expansion {...field} key={currentPath}>
                    <One LoadPlaceholder={LoadPlaceholder} fields={field.fields}
                      focus={focus} blur={blur} prefix={currentPath}
                      handler={object} change={onChange} />
                  </Expansion>
                );
              } else if (field.type === FieldType.Group) {
                return (
                  <Group {...field} key={currentPath}>
                    <One LoadPlaceholder={LoadPlaceholder} fields={field.fields}
                      focus={focus} blur={blur} prefix={currentPath}
                      handler={object} change={onChange} />
                  </Group>
                );
              } else {
                return createField(entity, currentPath);
              }
            })}
          </Fragment>
        );
      }
    };

  } // namespace components

} // namespace form
