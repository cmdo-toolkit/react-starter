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
}

async function dependencies(): Promise<void> {
  await Promise.all([import("./Providers/AccessStore"), import("./Providers/EventNetwork"), import("./Providers/EventStore")]);
}

async function event() {
  await Promise.all([import("./Projections/User")]);
}

async function routes() {
  await Promise.all([import("./Router/Routes")]);
}
