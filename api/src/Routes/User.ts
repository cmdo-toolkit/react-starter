import { Action, Route } from "cmdo-socket";
import { nanoid } from "nanoid";
import { stores } from "shared";

import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

//#region

const create: Action<{ name: string; email: string }> = async function (_, data) {
  stores.user.create({ id: nanoid(), ...data });
  return this.respond();
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

//#region

wss.register([Route.on("user.create", [hasData(["name", "email"]), create])]);

//#endregion
