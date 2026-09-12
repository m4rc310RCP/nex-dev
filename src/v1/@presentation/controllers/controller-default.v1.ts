import { Controller } from "tsoa";
import { IResponseDefault } from "./response-default.v1";

export class MController extends Controller {
 protected buildResponse<T>(
    status: number,
    data?: Partial<T>,
    message: string = "OK",
  ): (T extends undefined ? {} : T) & IResponseDefault {
    this.setStatus(status);

    return {
      status,
      message,
      ...(data ?? {}),
    } as (T extends undefined ? {} : T) & IResponseDefault;
  }

  protected buildPaginatedResponse<T>(
    status: number,
    data: T[],
    total: number,
    page: number,
    pageSize: number,
    message: string = "OK",
  ) {
    return this.buildResponse(
      status,
      {
        data,
        total,
        page,
        pageSize,
      },
      message,
    );
  }

  protected buildResponseError<T>(
    status: number,
    error: Error | unknown | undefined,
    data?: Partial<T>,
  ): T & IResponseDefault {
    this.setStatus(status);

    const message = `${error instanceof Error ? error.message : "Erro desconhecido"}`;

    return {
      ...{ nr_status: status, ds_mensagem: message },
      ...(data as T),
    };
  }
  protected assertExists<T>(value: T | null | undefined, message?: string) {
    if (!value || value === null) {
      throw new Error(message ?? "Objeto não foi informado.");
    }
  }
}