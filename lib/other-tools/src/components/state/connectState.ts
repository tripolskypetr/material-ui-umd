namespace other {

  const {
    createElement: h,
  } = React;

  export namespace components {

    export const connectState = (component) => () => {
      const [state] = useDispatch();
      if (state) {
        return h(component, state);
      } else {
        return null;
      }
    }

  } // namespace components

} // namespace other
