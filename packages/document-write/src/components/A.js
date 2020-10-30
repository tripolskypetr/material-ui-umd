var components;
(function(components) {

  const {
    createElement: h,
  } = React;

  const {
    Typography,
  } = material.core;

  components.A = () => h(Typography, {variant: 'h4'}, 'Компонент A');

})(components || (components = {}));
