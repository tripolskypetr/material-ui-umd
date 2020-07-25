/// <reference path="../components/index.ts"/>
/// <reference path="../common/index.ts"/>

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

    const OneInternal = ({fields, handler, change, path = 'root', LoadPlaceholder = null}: IOnePropsInternal) => {
      const object = useResolved(handler);
      if (object === null) {
        return LoadPlaceholder;
      }
      return (
        <Fragment>
          {fields?.map((field, index) => {
            const entity: IEntity = {...field, object, change};
            const currentPath = `${path}.${field.name}[${index}]`;
            console.log(currentPath);
            if (field.type === FieldType.String) {
              return <String {...entity} key={currentPath} />;
            } else if (field.type === FieldType.Expansion) {
              return (
                <Expansion {...field} key={currentPath}>
                  <OneInternal LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields}
                    path={currentPath}
                    handler={handler}
                    change={change}/>
                </Expansion>
              );
            } else if (field.type === FieldType.Group) {
              return (
                <Group {...field} key={currentPath}>
                  <OneInternal LoadPlaceholder={LoadPlaceholder}
                    fields={field.fields}
                    path={currentPath}
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

    export const One = withType<IOneProps>(OneInternal);

  } // namespace internal

} // namespace form
