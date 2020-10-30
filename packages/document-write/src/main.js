(function() {

  const {
    createElement: h,
    Fragment,
  } = React;

  const {
    A, B, C,
  } = components;

  const App = () => h(Fragment, null,
    h(A), h(B), h(C),
  );

  const mountPoint = document.querySelector('#mount-point');
  ReactDOM.render(h(App), mountPoint);

})();
