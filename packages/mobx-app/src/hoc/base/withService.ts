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

    type Service = typeof services.BaseService;

    // tslint:disable-next-line: new-parens
    const ioc = new class {
      private instances = new WeakMap<Service, any>();
      inject(type: Service) {
        if (this.instances.has(type)) {
          return this.instances.get(type);
        } else {
          const instance = new type();
          this.instances.set(type, instance);
          return instance;
        }
      }
    };

    /**
     * Компонент высшего порядка позволяет осуществить забор контекста
     * роутера для переадресации на страницу авторизации при ошибке
     * Inversion of Control and Dependency Injection
     */
    const createConsumer = (Service: Service, serviceName: string) =>
      (Component: material.Component) => (props) => {
        return h(Component, assign({}, props, {
          [serviceName]: ioc.inject(Service),
        }));
      };

    /**
     * Во избежание дублирований, через функциональную композицию,
     * я сразу применяю реакцию observer из mobx-react-lite
     */
    export const withService = (Service, serviceName: string) =>
      (Component: material.Component) => compose(
      createConsumer(Service, serviceName),
      observer,
    )(Component);

  } // namespace hooks

} // namespace mobxApp
