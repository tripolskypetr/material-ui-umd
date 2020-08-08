namespace form {

  export namespace components {

    export function withType<T = any>(Component: React.ComponentType<any>) {
      return (props: T) => <Component {...props}/>;
    }

  } // namespace components

} // namespace form
