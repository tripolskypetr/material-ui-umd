namespace mobxApp {

  const {
    makeObservable,
    // computed,
    observable,
    action,
  } = mobx;

  export namespace services {

    export class AuthService extends ApiService {

      count = 0;
      inc = () => this.count++
      dec = () => this.count--

      constructor(...args) {
        super(...args);
        makeObservable(this, {
          count: observable,
          inc: action,
          dec: action,
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
