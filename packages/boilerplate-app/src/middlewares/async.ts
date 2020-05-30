namespace boilerplate {

  export namespace middlewares {

    export const async = ({dispatch}) =>
      (next) => (action) => {
        const {payload} = action;
        if (payload && action.then) {
          payload.then((payload) => {
            dispatch({...action, payload});
          }).catch((payload) => {
            throw payload;
          });
        } else {
          return next(action);
        }
      };

  } // namespace middlewares

} // namespace boilerplate
