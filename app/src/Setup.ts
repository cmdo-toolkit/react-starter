import { socket } from "./Providers/Socket";

socket.connect();

/*
 |--------------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------------
 */

export async function setup(): Promise<void> {
  await dependencies();
  await event();
  await routes();
}

async function dependencies(): Promise<void> {
  await Promise.all([import("./Providers/AccessStore"), import("./Providers/EventStore")]);
}

async function event() {
  await Promise.all([import("./Data/Projections/User")]);
}

async function routes() {
  await Promise.all([import("./Router/Routes")]);
}
