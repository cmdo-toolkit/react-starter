import { Auth } from "cmdo-auth";
import { HttpError, Middleware } from "cmdo-http";
import { Action } from "cmdo-socket";
import { ServerResponse } from "http";

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

declare module "cmdo-socket" {
  interface Client {
    auth: Auth;
  }
}

declare module "http" {
  interface IncomingMessage {
    auth: Auth;
  }
}

/*
 |--------------------------------------------------------------------------------
 | Middleware
 |--------------------------------------------------------------------------------
 */

export const auth: {
  socket: Action;
  http: Middleware;
} = {
  socket: async function (socket) {
    if (!socket.auth) {
      socket.auth = await Auth.guest();
    }
    return this.accept();
  },
  http: async function (req, res) {
    if (req.headers.authorization) {
      try {
        req.auth = await Auth.resolve(req.headers.authorization);
      } catch (err) {
        sendUnauthorizedResponse(res, err);
      }
    } else {
      req.auth = await Auth.guest();
    }
  }
};

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function sendUnauthorizedResponse(res: ServerResponse, error: Error): void {
  res.statusCode = 401;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(new HttpError(401, "Unauthorized", { error })));
  res.end();
}
