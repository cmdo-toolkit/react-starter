import { Collection as DBCollection } from "cmdo-db";

import { Account } from "./Models/Account";
import { Event } from "./Models/Event";
import { adapter } from "./Providers/IDBAdapter";

export type Collection = keyof typeof collection;

export const collection = {
  accounts: new DBCollection(Account, adapter),
  events: new DBCollection(Event, adapter)
};
