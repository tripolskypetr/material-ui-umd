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

    const isCyclic = (obj) => {
      const seenObjects = [];
      const detect = (obj) => {
        if (obj && typeof obj === 'object') {
          if (seenObjects.indexOf(obj) !== -1) {
            return true;
          }
          seenObjects.push(obj);
          for (const key in obj) {
            if (obj.hasOwnProperty(key) && detect(obj[key])) {
              return true;
            }
          }
        }
        return false;
      }
      return detect(obj);
    };

    const createSnapshot = (ref) => entries(toJS(ref))
      .filter(([{}, v]) => typeof v !== 'function')
      .reduce((acm, [k, v]) => ({...acm, [k]: v}), {});

    const filterCyclic = (arr: any[]) => arr
      .filter((v) => !isCyclic(v));

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
            args: filterCyclic(ev.arguments),
            name: ev.name,
          });
        }
      });

    } // class ApiService

  } // namespace services

} // namespace mobxApp
