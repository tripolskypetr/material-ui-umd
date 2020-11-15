namespace pickers {

  const {
    MINUTES,
  } = utils.constants;

  export namespace components {

    export const MinutesView = ({
      onChange = (change) => console.log({change}),
      date = moment(),
    }) => {
      const value = date.get('minutes');
      const handleChange = (minutes) => {
        const updatedDate = date.clone().minutes(minutes);
        onChange(updatedDate);
      };
      return (
        <Clock
          type={MINUTES}
          onChange={handleChange}
          value={value}
        >
          <ClockNumber label="00" selected={value === 0} index={0} />
          <ClockNumber label="05" selected={value === 5} index={1} />
          <ClockNumber label="10" selected={value === 10} index={2} />
          <ClockNumber label="15" selected={value === 15} index={3} />
          <ClockNumber label="20" selected={value === 20} index={4} />
          <ClockNumber label="25" selected={value === 25} index={5} />
          <ClockNumber label="30" selected={value === 30} index={6} />
          <ClockNumber label="35" selected={value === 35} index={7} />
          <ClockNumber label="40" selected={value === 40} index={8} />
          <ClockNumber label="45" selected={value === 45} index={9} />
          <ClockNumber label="50" selected={value === 50} index={10} />
          <ClockNumber label="55" selected={value === 55} index={11} />
        </Clock>
      );
    };

  } // namespace components

} // namespace pickers
