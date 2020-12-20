namespace mobxApp {

  const {
    makeObservable,
    observable,
  } = mobx;

  export namespace services {

    export class ApiService {

      private static _token: string = '';

      public get token() {
        return ApiService._token;
      }

      public set token(t) {
        ApiService._token = t;
      }

      constructor(
        private onError = (res) => res,
      ) {
        this.onInit();
      }

      /**
       * Метод для переопределения, подразумевается
       * вызов makeObservable
       */
      protected onInit() {
        this.makeObservable();
      }

      /**
       * Для наследования, наблюдаемые, вычисляемые поля
       * и действия объявляются тут
       */
      makeObservable(annotations = {}, options?) {
        makeObservable(this, {
          ...annotations,
        }, options);
      }

      get(url: RequestInfo, options: RequestInit, skipError = false, body = null): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'GET',
          headers: {
            ...this.token ? { 'Token': this.token } : { },
            ...options.headers,
          },
          body,
        }).catch(skipError ? () => null : this.onError);
      }

      post(url: RequestInfo, options: RequestInit, skipError = false, body = null): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'POST',
          headers: {
            ...this.token ? { 'Token': this.token } : { },
            ...options.headers,
          },
          body,
        }).catch(skipError ? () => null : this.onError);
      }

      put(url: RequestInfo, options: RequestInit, skipError = false, body = null): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'PUT',
          headers: {
            ...this.token ? { 'Token': this.token } : { },
            ...options.headers,
          },
          body,
        }).catch(skipError ? () => null : this.onError);
      }

      patch(url: RequestInfo, options: RequestInit, skipError = false, body = null): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'PATCH',
          headers: {
            ...this.token ? { 'Token': this.token } : { },
            ...options.headers,
          },
          body,
        }).catch(skipError ? () => null : this.onError);
      }

    } // class ApiService

  } // namespace services

} // namespace mobxApp
