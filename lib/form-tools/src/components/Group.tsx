namespace form {

  const {
    createElement: h,
    forwardRef,
  } = React;

  const {
    Grid,
    Box,
  } = material.core;

  const n = (v: string) => Number(v);

  export namespace components {

    namespace internal {

      const gridProps = (isItem) => {
        if (isItem) {
          return { spacing: 3, item: true }
        } else {
          return { container: true };
        }
      };

      const renderItem = (isItem, children, skipRightMargin) => {
        if (isItem) {
          return h(Box, {mr: skipRightMargin ? 0 : 1, mb: 2}, children);
        } else {
          return children;
        }
      };

      export const Group = ({
        className = '',
        columns = '',
        phoneColumns = '',
        tabletColumns = '',
        desktopColumns = '',
        children = null,
        isItem = false,
        style = null,
        skipRightMargin = false,
        ...otherProps
      }, ref) => (
        <Grid ref={ref} alignItems="flex-start"  {...otherProps} {...gridProps(isItem)}
          xs={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
          sm={n(columns ? columns : phoneColumns ? phoneColumns : '12')}
          md={n(columns ? columns : (phoneColumns || tabletColumns) ? (phoneColumns || tabletColumns) : '12')}
          lg={n(columns ? columns : (tabletColumns || desktopColumns) ? (tabletColumns || desktopColumns) : '12')}
          xl={n(columns ? columns : desktopColumns ? desktopColumns : '12')} className={className} style={style}>
          { renderItem(isItem, children, skipRightMargin) }
        </Grid>
      );

    } // namespace internal

    export const Group = forwardRef(internal.Group);

  } // namespace components

} // namespace form
