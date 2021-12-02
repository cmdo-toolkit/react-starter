import { Auth } from "cmdo-auth";
import { Action } from "cmdo-socket";

export const sign: Action<{ token: string }> = async function (socket, { token }) {
  try {
    socket.auth = await Auth.resolve(token);
  } catch (err) {
    return this.reject(err.message);
  }
  return this.respond();
};
