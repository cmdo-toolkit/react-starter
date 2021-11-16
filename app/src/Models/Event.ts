import { Model } from "cmdo-db";
import { EventDescriptor } from "cmdo-events";

type Attributes = { id: string } & EventDescriptor;

export class Event extends Model<Attributes> {
  public static readonly $collection = "events";

  public readonly stream: EventDescriptor["stream"];
  public readonly event: EventDescriptor["event"];
  public readonly hash: EventDescriptor["hash"];
  public readonly prevHash: EventDescriptor["prevHash"];
  public readonly heads: EventDescriptor["heads"];

  constructor(document: Attributes) {
    super(document);

    this.stream = document.stream;
    this.event = document.event;
    this.hash = document.hash;
    this.prevHash = document.prevHash;
    this.heads = document.heads;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      stream: this.stream,
      event: this.event,
      hash: this.hash,
      prevHash: this.prevHash
    });
  }
}
