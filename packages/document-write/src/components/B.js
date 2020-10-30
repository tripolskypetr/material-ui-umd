var components;
(function(components) {

  const {
    createElement: h,
  } = React;

  const {
    Typography,
  } = material.core;

  components.B = () => h(Typography, {variant: 'h4'}, 'Компонент B');

})(components || (components = {}));
