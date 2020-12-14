namespace pickers {

  const {
    HOURS,
  } = utils.constants;

  export namespace components {

    export const HourView = ({
      date = moment(),
      onChange = (change) => console.log({change}),
    }) => {
      const handleChange = (hours) => {
        const updatedDate = date.clone().hour(hours);
        onChange(updatedDate);
      };
      const value = date.get('hours');
      const ampmValue = Number(date.format('hh'));
      return (
        <Clock
          type={HOURS}
          onChange={handleChange}
          value={value}
        >
          <ClockNumber onClick={() => handleChange(12)} label="12" selected={ampmValue === 12} index={0} />
          <ClockNumber onClick={() => handleChange(1)} label="1" selected={ampmValue === 1} index={1} />
          <ClockNumber onClick={() => handleChange(2)} label="2" selected={ampmValue === 2} index={2} />
          <ClockNumber onClick={() => handleChange(3)} label="3" selected={ampmValue === 3} index={3} />
          <ClockNumber onClick={() => handleChange(4)} label="4" selected={ampmValue === 4} index={4} />
          <ClockNumber onClick={() => handleChange(5)} label="5" selected={ampmValue === 5} index={5} />
          <ClockNumber onClick={() => handleChange(6)} label="6" selected={ampmValue === 6} index={6} />
          <ClockNumber onClick={() => handleChange(7)} label="7" selected={ampmValue === 7} index={7} />
          <ClockNumber onClick={() => handleChange(8)} label="8" selected={ampmValue === 8} index={8} />
          <ClockNumber onClick={() => handleChange(9)} label="9" selected={ampmValue === 9} index={9} />
          <ClockNumber onClick={() => handleChange(10)} label="10" selected={ampmValue === 10} index={10} />
          <ClockNumber onClick={() => handleChange(11)} label="11" selected={ampmValue === 11} index={11} />
        </Clock>
      );
    };

  } // namespace components

} // namespace pickers
