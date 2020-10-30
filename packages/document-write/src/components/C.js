var components;
(function(components) {

  const {
    createElement: h,
  } = React;

  const {
    Typography,
  } = material.core;

  components.C = () => h(Typography, {variant: 'h4'}, 'Компонент C');

})(components || (components = {}));
