
/// <reference path="./context.ts"/>

namespace router {

  const {
    useContext,
  } = React;

  export namespace components {

    export const Link = ({
      children = null,
      url = '',
      ...otherProps
    }) => {
      const go = useContext(RouterContext);
      return (
        <a onClick={() => go(url)} {...otherProps}>
          {children}
        </a>
      );
    };

  } // namespace components

} // namespace router
