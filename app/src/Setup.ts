import { sign } from "./Auth";
import { socket } from "./Providers/Socket";

/*
 |--------------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------------
 */

export async function setup(): Promise<void> {
  await socket.connect();
  await dependencies();
  await event();
  await routes();
  await resolve();
}

async function dependencies(): Promise<void> {
  await Promise.all([import("./Providers/Auth"), import("./Providers/EventStore"), import("./Providers/EventStream")]);
}

async function event() {
  await Promise.all([import("./Projections/User")]);
}

async function routes() {
  await Promise.all([import("./Router/Routes")]);
}

async function resolve() {
  const token = localStorage.getItem("token");
  if (token) {
    await sign(token);
  }
}
