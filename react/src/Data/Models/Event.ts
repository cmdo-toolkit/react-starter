import { Model } from "cmdo-db";
import { Descriptor } from "cmdo-events";

import { store } from "../../Providers/EventStore";

export class Event extends Model<Descriptor> {
  public static readonly $collection = "events";

  public readonly stream: Descriptor["stream"];
  public readonly event: Descriptor["event"];

  constructor(document: Descriptor) {
    super(document);

    this.stream = document.stream;
    this.event = document.event;

    Object.freeze(this);
  }

  public toEvent() {
    return store.toEvent(this.toJSON());
  }

  public toJSON(): Descriptor {
    return super.toJSON({
      stream: this.stream,
      event: this.event
    });
  }
}
