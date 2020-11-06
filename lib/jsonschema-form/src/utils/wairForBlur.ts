namespace form {

  export namespace utils {

    /**
     * Ожидает потерю фокуса, используя
     * document.activeElement
     */
    export const waitForBlur = (ref: HTMLElement) => new Promise((res) => {
      const interval = setInterval(() => {
        /**
         * Для поддержки группы полей, также проверяем наличие родителя сквозь
         * вложенность через HTMLElement.prototype.contains()
         */
        if (document.activeElement !== ref && !ref.contains(document.activeElement)) {
          clearInterval(interval);
          res();
        }
      }, 50);
    });

  } // namespace utils

} // namespace form
