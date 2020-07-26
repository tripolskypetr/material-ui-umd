/// <reference path="../components/index.ts"/>
/// <reference path="../common/index.ts"/>

/// <reference path="../fields/StringField.tsx"/>
/// <reference path="../fields/LineField.tsx"/>
/// <reference path="../fields/SwitchField.tsx"/>

namespace form {

  const {
    Fragment,
    useState,
    useEffect,
  } = React;

  const useResolved = (handler: () => Promise<any> | any): any => {
    const [data, setData] = useState(null);
    useEffect(() => {
      const tryResolve = async () => {
        if (handler instanceof Promise) {
          setData(await handler());
        } else if (typeof handler === 'function') {
          setData(handler());
        } else {
          setData(handler);
        }
      };
      tryResolve();
    }, [handler]);
    return [data, setData];
  };

  export namespace internal {

    export const One = ({fields, handler, change, prefix = 'root', LoadPlaceholder = null}: IOneProps) => {
      const [object, setObject] = useResolved(handler);
      const onChange = (v) => {
        setObject(v);
        change(v);
      };
      if (object === null) {
        return LoadPlaceholder;
      }
      return (
        <Fragment>
          {fields?.map((field, index) => {
            const entity: IEntity = {...field, object, change: onChange};
            const currentPath = `${prefix}.${field.type}[${index}]`;
            if (field.type === FieldType.String) {
              return <StringField {...entity} key={currentPath} />
            } else if (field.type === FieldType.Line) {
              return <LineField {...entity} key={currentPath} />
            } else if (field.type === FieldType.Radio) {
              return <RadioField {...entity} key={currentPath} />
            } else if (field.type === FieldType.Switch) {
              return <SwitchField {...entity} key={currentPath} />
            } else if (field.type === FieldType.Expansion) {
              return (
                <Expansion {...field} key={currentPath}>
                  <One LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields} prefix={currentPath}
                    handler={object} change={onChange}/>
                </Expansion>
              );
            } else if (field.type === FieldType.Group) {
              return (
                <Group {...field} key={currentPath}>
                  <One LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields} prefix={currentPath}
                    handler={object} change={onChange}/>
                </Group>
              );
            } else {
              throw new Error('One unknown field type');
            }
          })}
        </Fragment>
      );
    };

  } // namespace internal

} // namespace form
