(function() {
  const template = (url) => `\x3Cscript type="text/javascript" src="${url}">\x3C/script>`;
  window.React || document.write(template("/3rdparty/react@16.13.1/react.development.js"));
  window.ReactDOM || document.write(template("/3rdparty/react-dom@16.13.1/react-dom.development.js"));
  window.useDebounce || document.write(template("/3rdparty/use-debounce@5.0.1/use-debounce.min.js"));
  window.classNames || document.write(template("/3rdparty/classnames@2.2.6/classnames.js"));
  window.material || document.write(template("/dist/material-ui.min.js"));
  window.form || document.write(template("/lib/jsonschema-form/dist/jsonschema-form.js"));
})();
