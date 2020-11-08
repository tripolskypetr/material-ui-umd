namespace snack {

  const {
    Fragment,
  } = React;

  const {
    createElement: h,
  } = React;

  const {
    useState,
    useLayoutEffect,
  } = React;

  export namespace components {

    const applyCloseMiddleware = (s: ISnack, onClose: CallableFunction): ISnack => ({
      ...s, onClose: () => {
        if (s.onClose) {
          s.onClose();
        }
        onClose();
      }
    });

    export const SnackProvider = ({
      children = null,
    }) => {
      const [snack, setSnack] = useState(null);
      const [queue, setQueue] = useState([]);

      /**
       * Гарантировано вызывается после всех мутаций
       * DOM древа: snack и queue будут обновлены
       * одновременно...
       */
      useLayoutEffect(() => {
        if (snack === null) {
          const [snack] = queue;
          setSnack(h(SnackViewer, snack));
          setQueue(queue.slice(1));
        }
      }, [snack, queue]);

      /**
       * Помимо уведомления кода прикладного программиста,
       * при закрытии очищаем выбранный snack для
       * перерисовки DOM древа...
       */
      const onSnack = (s: ISnack) => setQueue((q) => q.concat(
        applyCloseMiddleware(s, () => setSnack(null)),
      ));

      return (
        <Fragment>
          <SnackContext.Provider value={onSnack}>
            {children}
          </SnackContext.Provider>
          {snack}
        </Fragment>
      );
    };

  } // namespace components

} // namespace snack
