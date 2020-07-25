namespace form {

  export namespace internal {

    export function withType<T = any>(Component: React.ComponentType<any>) {
      return (props: T) => <Component {...props}/>;
    }

  } // namespace internal

} // namespace form
