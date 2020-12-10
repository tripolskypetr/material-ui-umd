
declare var module;
declare var require;
var module;

namespace form {

  /**
   * Обратная совместимость с NodeJS
   * https://nodejs.org/docs/v10.0.0/api/modules.html
   */
  if (module) {
    globalThis.React = require('react'); // ^16.13.1
    globalThis.material = <typeof material> {
      lab: require("@material-ui/lab"), // ^4.0.0-alpha.55
      core: require("@material-ui/core"), // ^4.9.14
      icons: require("@material-ui/icons"), // ^4.9.1
    };
    module.exports = form;
  }

} // namespace form
