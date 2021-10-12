import { socket } from "./Providers/Socket";

socket.connect();

/*
 |--------------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------------
 */

//#region

export async function setup(): Promise<void> {
  await dependencies();
  await event();
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Dependencies
 |--------------------------------------------------------------------------------
 */

//#region

async function dependencies(): Promise<void> {
  await Promise.all([import("./Providers/AccessStore"), import("./Providers/EventStore")]);
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Projections
 |--------------------------------------------------------------------------------
 */

//#region

async function event() {
  await Promise.all([import("./Data/Projections/User")]);
}

//#endregion
