import { Response } from "./schema";

export function didError(response: Response<unknown>): boolean {
  return !/^(2|3)/.test(response.meta.code.toString());
}
