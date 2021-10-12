import { nanoid } from "nanoid";
import { stores } from "shared";

import { EventEmitter } from "../EventEmitter";
import { Attributes } from "./Attributes";

type Events = {
  created(attributes: Attributes): void;
  activated(id: string): void;
};

type CreateCallback = {
  (error: Error | undefined, attributes: Attributes): void;
};

export const event = new (class AccountEvent extends EventEmitter<Events> {
  public created(attributes: Attributes) {
    this.emit("created", attributes);
  }

  /**
   * Submit an account create action against the system event store. This method
   * is written to handle the decoupled nature of an eventual event and waits
   * for the event to be projected successfully before resolving the callback.
   *
   * If no reponse is provided within 10 seconds of the method call the request
   * will fail with a error.
   *
   * If the action itself fails an error will be provided.
   */
  public create(email: string, cb: CreateCallback): void {
    const timeout = setTimeout(() => {
      this.removeListener("created", handleCreated);
      cb(new Error("Account Timeout > Could not resolve account creation in time"), undefined as any);
    }, 10000);

    function handleCreated(attributes: Attributes) {
      if (attributes.email === email) {
        clearTimeout(timeout);
        cb(undefined, attributes);
      }
    }

    this.addListener("created", handleCreated);

    stores.account.create({ id: nanoid(), email }).catch((error) => cb(error, undefined as any));
  }
})();
