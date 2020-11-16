namespace other {

  const {
    createElement: h,
  } = React;

  export namespace components {

    export type connectStateFunc = (
      component: material.Component,
      mapStateToProps?: (obj: any) => any,
      mapDispatchToProps?: (dispatch: (a: state.IReducerAction) => void) => any,
    ) => material.Component;

    export const connectState: connectStateFunc = (
      component,
      mapStateToProps = (state) => state,
      mapDispatchToProps = ({}) => ({})
    ) => (props) => {
      const [state, dispatch] = useDispatch();
      if (state) {
        return h(component, {...mapStateToProps(state), ...mapDispatchToProps(dispatch), ...props});
      } else {
        return null;
      }
    }

  } // namespace components

} // namespace other
