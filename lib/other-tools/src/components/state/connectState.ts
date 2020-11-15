namespace other {

  const {
    createElement: h,
  } = React;

  export namespace components {

    export const connectState = (component, mapStateToProps = (state) => state, mapDispatchToProps = ({}) => ({})) => () => {
      const [state, dispatch] = useDispatch();
      if (state) {
        return h(component, {...mapStateToProps(state), ...mapDispatchToProps(dispatch)});
      } else {
        return null;
      }
    }

  } // namespace components

} // namespace other
