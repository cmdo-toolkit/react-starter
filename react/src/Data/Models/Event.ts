import { Document, Model } from "cmdo-db";
import { Descriptor } from "cmdo-events";

type Attributes = Document & Descriptor;

export class Event extends Model<Attributes> {
  public static readonly $collection = "events";

  public readonly stream: Attributes["stream"];
  public readonly event: Attributes["event"];

  constructor(document: Attributes) {
    super(document);

    this.stream = document.stream;
    this.event = document.event;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      stream: this.stream,
      event: this.event
    });
  }
}
