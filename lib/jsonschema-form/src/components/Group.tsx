namespace form {

  const {
    Grid,
  } = material.core;

  const n = (v: string) => Number(v);

  export namespace internal {

    export const Group = ({
      className = '',
      columns = '12',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      children = null,
      ...otherProps
    }) => (
      <Grid {...otherProps}
        xs={n(columns ? columns : phoneColumns)}
        sm={n(columns ? columns : phoneColumns)}
        md={n(columns ? columns : (phoneColumns || tabletColumns))}
        lg={n(columns ? columns : (tabletColumns || desktopColumns))}
        xl={n(columns ? columns : desktopColumns)} className={className}>
        {children}
      </Grid>
    );

  } // namespace internal

} // namespace form
