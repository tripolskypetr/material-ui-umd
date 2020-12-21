namespace mobxApp {

  const API_SERVICE_TOKEN = 'BaseService_token';
  const LOG_KEY = 'BaseService_log';
  const LOG_TOTAL = 25;

  const {
    spy,
    toJS,
  } = mobx;

  const {
    entries,
  } = Object;

  export namespace services {

    // tslint:disable-next-line: new-parens
    const logger = new class {
      private get mutations() {
        return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      }
      private set mutations(v) {
        localStorage.setItem(LOG_KEY, JSON.stringify(v));
      }
      log(mutation) {
        this.mutations = [mutation, ...this.mutations.slice(0, LOG_TOTAL - 1)];
      }
    };

    const createSnapshot = (ref) => entries(toJS(ref))
      .filter(([{}, v]) => typeof v !== 'function')
      .reduce((acm, [k, v]) => ({...acm, [k]: v}), {});

    // tslint:disable-next-line: max-classes-per-file
    export class BaseService {

      public get token() {
        return sessionStorage.getItem(API_SERVICE_TOKEN);
      }

      public set token(t) {
        sessionStorage.setItem(API_SERVICE_TOKEN, t);
      }

      enableLogging = (self) => spy((ev) => {
        if (ev.type === 'action') {
          logger.log({
            snapshot: createSnapshot(self),
            name: ev.name,
          });
        }
      });

    } // class ApiService

  } // namespace services

} // namespace mobxApp
