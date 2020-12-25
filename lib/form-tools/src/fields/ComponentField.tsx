namespace form {

  const {
    isValidElement,
  } = React;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    export interface IComponentFieldProps {
      value: PickProp<IManaged, 'value'>;
    }

    export const ComponentField = makeManaged((props: IComponentFieldProps) => {
      if (isValidElement(props.value)) {
        return props.value;
      } else {
        return <p>Invalid component</p>
      }
    });

  } // namespace fields

} // namespace form
