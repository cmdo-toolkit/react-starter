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
}

/*
 |--------------------------------------------------------------------------------
 | Dependencies
 |--------------------------------------------------------------------------------
 */

async function dependencies(): Promise<void> {
  await Promise.all([import("./Providers/AccessStore"), import("./Providers/EventStore")]);
}

/*
 |--------------------------------------------------------------------------------
 | Projections
 |--------------------------------------------------------------------------------
 */

async function event() {
  await Promise.all([import("./Data/Projections/User")]);
}
