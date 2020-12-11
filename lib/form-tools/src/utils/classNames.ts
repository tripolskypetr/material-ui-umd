namespace form {

  export namespace utils {

    export const classNames = (...args) => {
      const classes = [];
      args.forEach((arg) => {
        if (arg) {
          const argType = typeof arg;
          if (argType === 'string' || argType === 'number') {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              const inner = classNames(...arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === 'object') {
            if (arg.toString !== Object.prototype.toString) {
              classes.push(arg.toString());
            } else {
              Object.entries(arg).filter(([{}, v]) => !!v)
                .forEach(([k]) => classes.push(k));
            }
          }
        }
      });
      return classes.join(' ');
    };

  } // namespace utils

} // namespace form
