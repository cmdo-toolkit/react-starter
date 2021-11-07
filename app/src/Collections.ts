import { Collection as DBCollection } from "cmdo-db";

import { Event } from "./Models/Event";
import { User } from "./Models/User";
import { adapter } from "./Providers/IDBAdapter";

export type Collection = keyof typeof collections;

export const collections = {
  events: new DBCollection(Event, adapter),
  users: new DBCollection(User, adapter)
};
