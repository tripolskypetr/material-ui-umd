
/// <reference path="./reducers/index.ts"/>
/// <reference path="./middlewares/index.ts"/>

namespace reduxApp {

  const {
    applyMiddleware,
    combineReducers,
    createStore
  } = Redux;

  const {
    async,
    logger,
  } = middlewares;

  const {
    route
  } = reducers;

  export const store = createStore(
    combineReducers({
      route
    }),
    applyMiddleware(
      async,
      logger,
    )
  );

} // namespace reduxApp
