namespace app {

  const {
    Typography,
  } = material.core

  const {
    Fragment
  } = React;

  export namespace pages {

    export const One = ({}) => {

      return (
        <Fragment>
          <Typography variant="h6">
            One component sample
          </Typography>
        </Fragment>
      );
    };

  } // namespace pages

} // namespace app
