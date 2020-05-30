
/// <reference path="../pages/index.ts"/>

namespace documentation {

  const {
    Briefing
  } = pages;

  export namespace components {

    namespace internal {
      export const Router = () => (
        <Briefing/>
      );
    } // namespace internal

    export const Router = internal.Router;

  } // namespace components

} // namespace documentation
