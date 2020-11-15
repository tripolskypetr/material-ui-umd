namespace pickers {

  export namespace utils {

    export const pickerStyles = (theme) => ({
      container: {
        width: 300,
        height: 420,
      },
      toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary[500],
        height: 100,
      },
    });

  } // namespace utils

} // namespace pickers
