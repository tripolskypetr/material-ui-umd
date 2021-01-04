namespace form {

  const {
    isValidElement,
  } = React;

  const {
    makeField,
  } = components;

  export namespace fields {

    export interface IComponentFieldProps {
      value: PickProp<IManaged, 'value'>;
    }

    export const ComponentField = makeField((props: IComponentFieldProps) => {
      if (isValidElement(props.value)) {
        return props.value;
      } else if (props.value) {
        return <p>Invalid component</p>
      } else {
        return null;
      }
    });

  } // namespace fields

} // namespace form
