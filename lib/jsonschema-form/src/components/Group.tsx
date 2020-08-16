namespace form {

  const {
    Grid,
  } = material.core;

  const n = (v: string) => Number(v);

  export namespace components {

    export const Group = ({
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      children = null,
      ...otherProps
    }) => (
      <Grid container alignItems="flex-start" style={{paddingRight: '5px'}} {...otherProps}
        xs={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
        sm={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
        md={n(columns ? columns : (phoneColumns || tabletColumns) ? (phoneColumns || tabletColumns) : '12')}
        lg={n(columns ? columns : (tabletColumns || desktopColumns) ? (tabletColumns || desktopColumns) : '12')}
        xl={n(columns ? columns : desktopColumns ? desktopColumns : '12')} className={className}>
        {children}
      </Grid>
    );

  } // namespace components

} // namespace form
