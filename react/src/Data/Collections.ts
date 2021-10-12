import { getCollection } from "cmdo-db";

import { Event } from "./Models/Event";
import { User } from "./Models/User";

export type Collection = keyof typeof collections;

export const collections = {
  events(...args: any[]) {
    const [stream] = args;
    if (!stream) {
      throw new Error("Missing stream id assignment in events collection resolver");
    }
    return getCollection<Event>(`events.${stream}`, Event);
  },
  users() {
    return getCollection<User>("users", User);
  }
};
