import { HttpAction, WsAction } from "cmdo-server";

/*
 |--------------------------------------------------------------------------------
 | Meta
 |--------------------------------------------------------------------------------
 */

export const meta: HttpAction = async function () {
  return this.resolve({
    service: "production",
    version: "0.0.1-DEV"
  });
};

/*
 |--------------------------------------------------------------------------------
 | Ping
 |--------------------------------------------------------------------------------
 */

export const ping: WsAction = async function () {
  return this.resolve({ pong: true });
};
