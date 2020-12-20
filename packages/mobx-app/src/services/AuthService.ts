namespace mobxApp {

  const {
    // observable,
    // computed,
    action,
  } = mobx;

  export namespace services {

    export class AuthService extends ApiService {

      onInit() {
        super.makeObservable({
          clearToken: action('Очистка заданного токена'),
          applyToken: action('Применение токена (авторизация)'),
        });
      }

      applyToken(token: string) {
        this.token = token;
      }

      clearToken() {
        this.token = '';
      }

    } // class AuthService

  } // namespace services

} // namespace mobxApp
