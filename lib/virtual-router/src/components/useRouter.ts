
/// <reference path="./context.ts"/>

namespace router {

  const {
    useContext
  } = React;

  export namespace components {

    export const useRouter = () => useContext(RouterContext);

  } // namespace components

} // namespace router
