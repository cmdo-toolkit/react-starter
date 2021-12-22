import { Action as HTTPAction } from "cmdo-http";
import { Action as WSAction } from "cmdo-socket";

/*
 |--------------------------------------------------------------------------------
 | Meta
 |--------------------------------------------------------------------------------
 */

export const meta: HTTPAction = async function () {
  return this.respond({
    service: "production",
    version: "0.0.1-DEV"
  });
};

/*
 |--------------------------------------------------------------------------------
 | Ping
 |--------------------------------------------------------------------------------
 */

export const ping: WSAction = async function () {
  return this.respond({ pong: true });
};
