namespace other {

  export namespace state {

    export interface IReducerAction<P = any> {
      type: string;
      payload: P;
    }

  } // namespace state

} // namespace other
