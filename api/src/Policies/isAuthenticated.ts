import { Action as HttpAction } from "cmdo-http";
import { Action as SocketAction } from "cmdo-socket";

/*
 |--------------------------------------------------------------------------------
 | Policies
 |--------------------------------------------------------------------------------
 */

export const isSocketAuthenticated: SocketAction = async function ({ auth }) {
  if (await auth.isAuthenticated()) {
    return this.accept();
  }
  return this.reject("Unauthorized");
};

export const isRequestAuthenticated: HttpAction = async function ({ auth }) {
  if (await auth.isAuthenticated()) {
    return this.accept();
  }
  return this.reject(401, "Unauthorized");
};
