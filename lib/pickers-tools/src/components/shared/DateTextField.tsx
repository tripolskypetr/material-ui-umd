namespace pickers {

  const {
    TextField,
  } = material.core;

  export namespace components {

    export const DateTextField = ({
      onChange = (change) => console.log({change}),
      format = '',
      value = '',
      ...other
    }) => {
      const getDisplayDate = () => moment(value).format(format);
      const handleChange = ({target}) => {
        const {value} = target;
        const momentValue = moment(value);
        if (momentValue.isValid()) {
          onChange(momentValue);
        }
      };
      return (
        <TextField
          value={getDisplayDate()}
          onChange={handleChange}
          {...other}
        />
      );
    }

  } // namespace components

} // namespace pickers
