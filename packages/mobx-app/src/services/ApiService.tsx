namespace mobxApp {

  const {
    makeObservable,
    observable,
    action,
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
      ) { }

      makeObservable(annotations, options?) {
        makeObservable(this, {
          ...annotations,
          token: observable,
          clearToken: action,
        }, options);
      }

      clearToken() {
        this.token = '';
      }

      get(url: RequestInfo, options: RequestInit): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'GET',
          headers: {
            'Token': this.token,
            ...options.headers,
          },
        }).catch(this.onError);
      }

      post(url: RequestInfo, options: RequestInit): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'POST',
          headers: {
            'Token': this.token,
            ...options.headers,
          },
        }).catch(this.onError);
      }

      put(url: RequestInfo, options: RequestInit): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'PUT',
          headers: {
            'Token': this.token,
            ...options.headers,
          },
        }).catch(this.onError);
      }

      patch(url: RequestInfo, options: RequestInit): Promise<Response> {
        return fetch(url, {
          ...options,
          method: 'PATCH',
          headers: {
            'Token': this.token,
            ...options.headers,
          },
        }).catch(this.onError);
      }

    }

  } // namespace services

} // namespace mobxApp
