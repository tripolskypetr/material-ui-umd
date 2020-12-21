namespace mobx {

  class Api {

    constructor(
      private error = (e) => e,
    ) { }

    /**
     *  - Согласно официальному руководству React, чтобы достучаться
     * до ошибки в обработчике коллбека следует использовать нативную
     * синтаксическую конструкцию try/catch.
     *  - Чтобы не дублировать обработку ошибок, рационально вынести в хук
     * https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
     */
    getFriends(userId: number) {
      return fetch(`/api/v1/friends?userId=${userId}`)
        .then((data) => data.json())
        .catch(this.error);
    }

  } // class API

  export const useApi = (error = (e) => e) => new Api(error);

} // namespace mobx
