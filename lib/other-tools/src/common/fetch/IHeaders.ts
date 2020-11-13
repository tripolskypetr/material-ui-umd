namespace other {

  export namespace fetch {

    export interface IHeaders {
      append(name: string, value: string):void;
      delete(name: string):void;
      get(name: string): string;
      getAll(name: string): string[];
      has(name: string): boolean;
      set(name: string, value: string): void;
    }

  } // namespace fetch

} // namespace other
