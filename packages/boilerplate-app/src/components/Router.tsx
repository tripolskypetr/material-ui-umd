
/// <reference path="../pages/index.ts"/>

namespace boilerplate {

  const {
    BriefingPage
  } = pages;

  export namespace components {

    namespace internal {
      export const Router = () => (
        <BriefingPage/>
      );
    } // namespace internal

    export const Router = internal.Router;

  } // namespace components

} // namespace boilerplate
