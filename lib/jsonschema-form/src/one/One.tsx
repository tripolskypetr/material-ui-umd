
/// <reference path="../common/IOneProps.ts"/>
/// <reference path="../common/IEntity.ts"/>
/// <reference path="../common/IField.ts"/>
/// <reference path="../common/FieldType.ts"/>

/// <reference path="../components/Group.tsx"/>
/// <reference path="../components/Expansion.tsx"/>

/// <reference path="../fields/String.tsx"/>

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
    return data;
  };

  export namespace internal {

    export const One = ({fields, handler, change, LoadPlaceholder = null}: IOneProps) => {
      const object = useResolved(handler);
      if (object === null) {
        return LoadPlaceholder;
      }
      return (
        <Fragment>
          {fields?.map((field) => {
            const entity: IEntity = {...field, object, change};
            if (field.type === FieldType.String) {
              return <String {...entity} />;
            } else if (field.type === FieldType.Expansion) {
              return (
                <Expansion {...field}>
                  <One LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields}
                    handler={handler}
                    change={change}/>
                </Expansion>
              );
            } else if (field.type === FieldType.Group) {
              return (
                <Group {...field}>
                  <One LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields}
                    handler={handler}
                    change={change}/>
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
