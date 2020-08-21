
/// <reference path="./context.ts"/>

namespace router {

  const {
    Children,
    useState,
    useEffect,
  } = React;

  const {
    createElement,
    isValidElement,
  } = React;

  export namespace components {

    const getRoute = (routes = [], location = '') => {
      const keys = []
      const params = {}
      const route = routes.reduce((acm, [url, component, guard]) => {
        const reg = pathToRegexp(url, keys)
        const match = reg.test(location)
        if (match) {
          const tokens = reg.exec(location)
          keys.forEach((key, i) => {
            params[key.name] = tokens[i + 1]
          })
          return [url, component, guard];
        }
        return acm;
      }, null);
      return route === null ? null : [...route, params];
    };

    export const Router = ({
      children = null,
    }) => {
      const [url, setUrl] = useState('/');
      const [routes, setRoutes] = useState([]);
      const [route, setRoute] = useState(null);

      useEffect(() => {
        const routes = [];
        Children.forEach(children, (element: React.ReactElement<RouteProps>) => {
          if (!isValidElement(element)) {
            throw new Error('Router invalid element');
          } else if (element.type !== Route) {
            throw new Error('Router invalid children type');
          } else {
            const { url, component, guard } = element.props;
            routes.push([url, component, guard ? guard : () => true]);
          }
        });
        setRoutes(routes);
      }, []);

      useEffect(() => {
        const route = getRoute(routes, url);
        if (route) {
          const [url, component, guard, params] = route;
          let root = null;
          if (guard(url)) {
            setRoute(createElement(component, params));
          } else if (root = getRoute(routes, '/')) {
            const [component] = root.slice(1);
            setRoute(createElement(component, params));
          }
        }
        // tslint:disable-next-line: no-string-literal
        window['routerUrl'] = url;
        // tslint:disable-next-line: no-string-literal
        window['routerGo'] = (url) => setUrl(url);
      }, [url, routes]);

      return (
        <RouterContext.Provider value={(url) => setUrl(url)}>
          {route}
        </RouterContext.Provider>
      );
    };

  } // namespace components

} // namespace router
