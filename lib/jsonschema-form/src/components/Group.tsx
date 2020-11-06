namespace form {

  const {
    forwardRef,
  } = React;

  const {
    Grid,
  } = material.core;

  const n = (v: string) => Number(v);

  export namespace components {

    namespace internal {

      export const Group = ({
        className = '',
        columns = '',
        phoneColumns = '',
        tabletColumns = '',
        desktopColumns = '',
        children = null,
        ...otherProps
      }, ref) => (
        <Grid ref={ref} container alignItems="flex-start" style={{paddingRight: '5px'}} {...otherProps}
          xs={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
          sm={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
          md={n(columns ? columns : (phoneColumns || tabletColumns) ? (phoneColumns || tabletColumns) : '12')}
          lg={n(columns ? columns : (tabletColumns || desktopColumns) ? (tabletColumns || desktopColumns) : '12')}
          xl={n(columns ? columns : desktopColumns ? desktopColumns : '12')} className={className}>
          {children}
        </Grid>
      );

    } // namespace internal

    export const Group = forwardRef(internal.Group);

  } // namespace components

} // namespace form
