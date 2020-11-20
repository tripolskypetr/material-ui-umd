namespace form {

  const {
    createElement: h,
  } = React;

  export namespace hooks {

    interface IProps {
      children?: React.ReactChildren;
    }

    export function withType<T extends IProps>(component: React.ComponentType<any>) {
      return (props: T) => h(component, props, props?.children);
    }

  } // namespace hooks

} // namespace form
