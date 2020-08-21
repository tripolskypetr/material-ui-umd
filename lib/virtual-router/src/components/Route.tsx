namespace router {

  export namespace components {

    export const Route = ({
      component = null,
      guard = (url?: string) => true,
      url = '',
    }) => <></>;

    export type RouteProps = Parameters<typeof Route>[0];

  } // namespace components

} // namespace router
