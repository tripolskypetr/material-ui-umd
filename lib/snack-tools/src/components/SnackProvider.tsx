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

    const applyCloseMiddleware = (
      s: ISnack,
      message: string,
      onClose: CallableFunction,
    ): ISnack => ({
      ...s, message, onClose() {
        if (s.onClose) { setTimeout(() => s.onClose()); }
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
        if (snack === null && queue.length) {
          const [snack] = queue;
          setSnack(h(SnackViewer, snack));
          setQueue(queue.slice(1));
        }
      }, [queue]);

      /**
       * Помимо уведомления кода прикладного программиста,
       * при закрытии очищаем выбранный snack для
       * перерисовки DOM древа...
       */
      const onSnack = (msg:string, s?: ISnack) => setQueue((q) => q.concat(
        applyCloseMiddleware(s || {}, msg, () => setSnack(null)),
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
