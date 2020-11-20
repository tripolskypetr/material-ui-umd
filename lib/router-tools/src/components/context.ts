namespace router {

  export namespace components {

    export const RouterContext = React.createContext(
      (url) => console.log({url}),
    );

  } // namespace components

} // namespace router
