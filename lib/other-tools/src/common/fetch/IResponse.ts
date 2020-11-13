namespace other {

  export namespace fetch {

    export interface IResponse<J = JSON> extends IBody<J> {
      error(): Response;
      redirect(url: string, status?: number): Response;
      type: ResponseType;
      url: string;
      status: number;
      ok: boolean;
      statusText: string;
      headers: Headers;
      clone(): Response;
    }

  } // namespace fetch

} // namespace other
