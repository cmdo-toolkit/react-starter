import { Auth } from "cmdo-auth";
import { Server } from "cmdo-server";

import { auth } from "../Middleware/Auth";

/*
 |--------------------------------------------------------------------------------
 | Module Extension
 |--------------------------------------------------------------------------------
 */

declare module "cmdo-server" {
  interface Client {
    auth: Auth;
  }
}

/*
 |--------------------------------------------------------------------------------
 | Server
 |--------------------------------------------------------------------------------
 */

export const server = new Server({
  middleware: [auth],
  connected: (client) => {
    client.auth = Auth.guest();
  }
});

export const route = server.route;
