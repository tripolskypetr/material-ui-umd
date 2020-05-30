namespace boilerplate {

  export namespace middlewares {

    const global = window as any;

    global.trace = [];

    export const logger = () => (next) => (a) => {
      const date = new Date();
      const action = JSON.stringify(a);
      global.trace = [...global.trace, {action, date}];
      return next(a);
    };

  } // namespace middlewares

} // namespace boilerplate
