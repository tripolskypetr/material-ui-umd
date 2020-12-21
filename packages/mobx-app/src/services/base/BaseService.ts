namespace mobxApp {

  const API_SERVICE_TOKEN = 'BaseService_token';

  export namespace services {

    export class BaseService {

      public get token() {
        return sessionStorage.getItem(API_SERVICE_TOKEN);
      }

      public set token(t) {
        sessionStorage.setItem(API_SERVICE_TOKEN, t);
      }

    } // class ApiService

  } // namespace services

} // namespace mobxApp
