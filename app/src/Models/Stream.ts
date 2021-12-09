import { Document, Model } from "cmdo-db";

type Attributes = Document & {
  commit: string;
};

export class Stream extends Model<Attributes> {
  public static readonly $collection = "streams";

  public readonly commit: Attributes["commit"];

  constructor(document: Attributes) {
    super(document);

    this.commit = document.commit;

    Object.freeze(this);
  }

  /*
   |--------------------------------------------------------------------------------
   | Serializer
   |--------------------------------------------------------------------------------
   */

  public toJSON(): Attributes {
    return super.toJSON({
      commit: this.commit
    });
  }
}
