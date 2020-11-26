namespace other {

  export namespace fetch {

    export interface IResponse<J = JSON> extends IBody<J> {
      error(): IResponse;
      redirect(url: string, status?: number): IResponse;
      type: ResponseType;
      url: string;
      status: number;
      ok: boolean;
      statusText: string;
      headers: IHeaders;
      clone(): IResponse;
    }

  } // namespace fetch

} // namespace other
