
declare var module;
declare var require;
// tslint:disable-next-line: no-var-keyword
var module;

namespace router {

  /**
   * Обратная совместимость с NodeJS
   * https://nodejs.org/docs/v10.0.0/api/modules.html
   */
  if (module) {
    globalThis.React = require('react'); // ^16.13.1
    module.exports = router;
  }

} // namespace router
