namespace mobxApp {

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

  export namespace hoc {

    /**
     * Компонент высшего порядка позволяет осуществить забор контекста
     * роутера для переадресации на страницу авторизации при ошибке
     */
    const createConsumer = (Service: typeof services.BaseService, serviceName: string) =>
      (Component: material.Component) => (props) => {
        return h(Component, assign({}, props, {
          [serviceName]: new Service(),
        }));
      };

    /**
     * Во избежание дублирований, через функциональную композицию,
     * я сразу применяю реакцию observer из mobx-react-lite
     */
    export const withService = (Service, serviceName: string, fallbackRoute = '/') =>
      (Component: material.Component) => compose(
      createConsumer(Service, serviceName),
      observer,
    )(Component);

  } // namespace hooks

} // namespace mobxApp
