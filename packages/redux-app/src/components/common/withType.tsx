namespace reduxApp {

  export namespace components {

    export namespace common {

      export function withType<T = any>(Component: React.ComponentType<any>) {
        return (props: T) => <Component {...props}/>;
      }

    } // namespace common

  } // namespace components

} // namespace reduxApp
