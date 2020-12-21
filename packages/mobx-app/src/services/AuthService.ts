namespace mobxApp {

  const {
    makeObservable,
    // computed,
    observable,
    action,
  } = mobx;

  export namespace services {

    export class AuthService extends BaseService {

      count = 0;
      inc = () => this.count++;
      dec = () => this.count--;

      constructor() {
        super();
        makeObservable(this, {
          count: observable,
          inc: action,
          dec: action,
        })
      }

      /**
       * Получение токена по паролю
       */
      login(login: string, password: string) {
        console.log(login, password);
      }

      /**
       * Удаление токена
       */
      logout(token: string) {
        console.log(token);
      }


    } // class AuthService

  } // namespace services

} // namespace mobxApp
