import { Model } from "cmdo-db";
import { EventRecord } from "cmdo-events";

type Attributes = { id: string } & EventRecord;

export class Event extends Model<Attributes> {
  public static readonly $collection = "events";

  public readonly type: EventRecord["type"];
  public readonly data: EventRecord["data"];
  public readonly meta: EventRecord["meta"];
  public readonly hash: EventRecord["hash"];

  constructor(document: Attributes) {
    super(document);

    this.type = document.type;
    this.data = document.data;
    this.meta = document.meta;
    this.hash = document.hash;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      type: this.type,
      data: this.data,
      meta: this.meta,
      hash: this.hash
    });
  }
}
