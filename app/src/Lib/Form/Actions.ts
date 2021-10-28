import { Response } from "./Response";

export type Action<Type> = (value?: Type) => Response;

export function isDefined<Type>(message: string): Action<Type> {
  return (value?: Type) => {
    if (value === undefined) {
      return Response.invalid(message);
    }
    return Response.valid();
  };
}
