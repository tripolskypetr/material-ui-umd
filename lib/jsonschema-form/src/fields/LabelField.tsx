namespace form {

  const {
    Typography
  } = material.core;

  const {
    Fragment
  } = React;

  export namespace fields {

    export const LabelField = ({title, description}: IEntity) => (
      <Fragment>
        {title && <Typography variant="h6">{title}</Typography>}
        {description && <Typography variant="subtitle1">{description}</Typography>}
      </Fragment>
    );

  } // namespace fields

} // namespace form
