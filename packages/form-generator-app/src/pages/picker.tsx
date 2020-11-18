namespace app {

  const {
    Fragment,
  } = React;

  const {
    Button,
  } = material.core;

  const {
    DateProvider,
    useDate,
  } = pickers;

  const {
    TimeProvider,
    useTime,
  } = pickers;

  export namespace pages {

    const View = () => {
      const date = useDate();
      const time = useTime();
      const dateCallback = () => date().then((m) => {
        if (m) {
          alert(m.format('MM-DD-YYYY'));
        } else {
          alert('rejected');
        }
      });
      const timeCallback = () => time().then((m) => {
        if (m) {
          alert(m.format('H:mm'));
        } else {
          alert('rejected');
        }
      });
      return (
        <Fragment>
          <Button onClick={dateCallback}>
            Pick date
          </Button>
          <Button onClick={timeCallback}>
            Pick time
          </Button>
        </Fragment>
      );
    }

    export const PickerPage = () => (
      <DateProvider>
        <TimeProvider>
          <View/>
        </TimeProvider>
      </DateProvider>
    );

  } // namespace pages

} // namespace pages
