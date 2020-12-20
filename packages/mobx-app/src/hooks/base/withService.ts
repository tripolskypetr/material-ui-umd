namespace mobxApp {

  const {
    useRouter,
  } = router;

  const {
    assign,
  } = Object;

  const {
    compose,
  } = form;

  const {
    createElement: h,
  } = React;

  const {
    observer,
  } = mobxReactLite;

  export namespace hooks {

    /**
     * Компонент высшего порядка позволяет осуществить забор контекста
     * роутера для переадресации на страницу авторизации при ошибке
     */
    const createConsumer = (Service: typeof services.ApiService, serviceName: string, fallbackRoute: string) =>
      (Component: material.Component) => (props) => {
        const go = useRouter();
        const handleError = () => go(fallbackRoute);
        return h(Component, assign(props, {
          [serviceName]: new Service(handleError),
        }))
      };

    /**
     * Во избежание дублирований, через функциональную композицию,
     * я сразу применяю реакцию observer из mobx-react-lite
     */
    export const withService = (Service, serviceName: string, fallbackRoute = '/') =>
      (Component: material.Component) => compose(
      createConsumer(Service, serviceName, fallbackRoute),
      observer,
    )(Component);

  } // namespace hooks

} // namespace mobxApp
