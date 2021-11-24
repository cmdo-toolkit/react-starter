import { Model } from "cmdo-db";
import { EventRecord } from "cmdo-events";

type Attributes = { id: string } & EventRecord;

export class Event extends Model<Attributes> {
  public static readonly $collection = "events";

  public readonly streamId: EventRecord["streamId"];
  public readonly type: EventRecord["type"];
  public readonly data: EventRecord["data"];
  public readonly meta: EventRecord["meta"];
  public readonly date: EventRecord["date"];
  public readonly author: EventRecord["author"];
  public readonly height: EventRecord["height"];
  public readonly parent: EventRecord["parent"];
  public readonly commit: EventRecord["commit"];

  constructor(document: Attributes) {
    super(document);

    this.streamId = document.streamId;
    this.type = document.type;
    this.data = document.data;
    this.meta = document.meta;
    this.date = document.date;
    this.author = document.author;
    this.height = document.height;
    this.parent = document.parent;
    this.commit = document.commit;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      streamId: this.streamId,
      type: this.type,
      data: this.data,
      meta: this.meta,
      date: this.date,
      author: this.author,
      height: this.height,
      parent: this.parent,
      commit: this.commit
    });
  }
}
