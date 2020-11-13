namespace other {

  export namespace fetch {

    export interface IBody<J = JSON> {
      bodyUsed: boolean;
      arrayBuffer(): Promise<ArrayBuffer>;
      blob(): Promise<Blob>;
      formData(): Promise<FormData>;
      json(): Promise<J>;
      text(): Promise<string>;
    }

  } // namespace fetch

} // namespace other
