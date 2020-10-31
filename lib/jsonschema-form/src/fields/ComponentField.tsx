namespace form {

  const {
    isValidElement,
  } = React;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    export const ComponentField = makeManaged(({value}) => {
      if (isValidElement(value)) {
        return value;
      } else {
        return <p>Invalid component</p>
      }
    });

  } // namespace fields

} // namespace form
