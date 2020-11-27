namespace other {

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

    interface IQueuedSnack extends snack.ISnack {
      key?: number;
    }

    const applyCloseMiddleware = (
      s: snack.ISnack,
      message: string,
      onClose: CallableFunction,
    ): IQueuedSnack => ({
      ...s, message, key: Date.now(),
      onClose() {
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
      }, [snack, queue]);

      /**
       * Помимо уведомления кода прикладного программиста,
       * при закрытии очищаем выбранный snack для
       * перерисовки DOM древа...
       */
      const onSnack = (msg:string, s?: snack.ISnack) => setQueue((q) => q.concat(
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
