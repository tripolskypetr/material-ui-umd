
/// <reference path="../actions.ts"/>

namespace reduxApp {

  export namespace reducers {

    const checkPayload = ({type}) => {
      if (type === 'briefing') {
        return true;
      } else if (type === 'components') {
        return true;
      } else {
        return false;
      }
    }

    export const route = (state = {current: {type: 'briefing'}}, action) => {
      switch (action.type) {
        case RouteActions.Go:
          if (!checkPayload(action.payload)) {
            throw new Error('route unknown action payload ' + action.payload);
          }
          return Object.assign({}, {current: action.payload});
        default:
          return state;
      }
    }

  } // reducers

} // namespace reduxApp
