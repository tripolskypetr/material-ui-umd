namespace form {

  const {
    createElement: h,
    forwardRef,
  } = React;

  const {
    Grid,
    Box,
  } = material.core;

  const FULL_ROW = '12';

  export namespace components {

    const n = (v: string) => Number(v);

    namespace internal {

      const gridProps = (isItem) => {
        if (isItem) {
          return { spacing: 3, item: true }
        } else {
          return { container: true };
        }
      };

      const renderItem = (isItem, children, mr, mb) => {
        if (isItem) {
          return h(Box, {mr, mb}, children);
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
        fieldRightMargin = 1,
        fieldBottomMargin = 2,
        ...otherProps
      }, ref) => (
        <Grid ref={ref} alignItems="flex-start"  {...otherProps} {...gridProps(isItem)}
          xs={n(phoneColumns || columns || FULL_ROW)}
          sm={n(phoneColumns || columns || FULL_ROW)}
          md={n(tabletColumns || phoneColumns || columns || FULL_ROW)}
          lg={n(tabletColumns || desktopColumns || columns || FULL_ROW)}
          xl={n(desktopColumns || columns || FULL_ROW)} className={className} style={style}>
          { renderItem(isItem, children, fieldRightMargin, fieldBottomMargin) }
        </Grid>
      );

    } // namespace internal

    export const Group = forwardRef(internal.Group);

  } // namespace components

} // namespace form
