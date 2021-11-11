import { Model } from "cmdo-db";
import { EventDescriptor } from "cmdo-events";

type Attributes = { id: string } & EventDescriptor;

export class Event extends Model<Attributes> {
  public static readonly $collection = "events";

  public readonly stream: EventDescriptor["stream"];
  public readonly event: EventDescriptor["event"];
  public readonly prevHash: EventDescriptor["prevHash"];

  constructor(document: Attributes) {
    super(document);

    this.stream = document.stream;
    this.event = document.event;
    this.prevHash = document.prevHash;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      stream: this.stream,
      event: this.event,
      prevHash: this.prevHash
    });
  }
}
