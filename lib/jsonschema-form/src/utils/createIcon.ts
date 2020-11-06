namespace form {

  const {
    Icon: MatIcon,
  } = material.core;

  const {
    createElement: h,
  } = React;

  export namespace utils {

    export const createIcon = (icon) => typeof icon === 'string'
      ? h(MatIcon, null, icon)
      : h(icon);

  } // namespace utils

} // namespace form
