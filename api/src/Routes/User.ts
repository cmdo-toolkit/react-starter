import { Action, Route } from "cmdo-socket";
import { nanoid } from "nanoid";
import { stores } from "stores";

import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

const create: Action<{ name: string; email: string }> = async function (socket, data) {
  stores.user.create({ accountId: socket.auth.auditor, userId: nanoid(), ...data });
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([Route.on("user.create", [hasData(["name", "email"]), create])]);
