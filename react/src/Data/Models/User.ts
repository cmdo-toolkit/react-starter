import { Document, Model } from "cmdo-db";

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

//#region

type Attributes = Document & {
  name: string;
  email: string;
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Main
 |--------------------------------------------------------------------------------
 */

//#region

export class User extends Model<Attributes> {
  public static readonly $collection = "users";

  public readonly name: Attributes["name"];
  public readonly email: Attributes["email"];

  constructor(document: Attributes) {
    super(document);

    this.name = document.name;
    this.email = document.email;

    Object.freeze(this);
  }

  public toJSON(): Attributes {
    return super.toJSON({
      name: this.name,
      email: this.email
    });
  }
}

//#endregion
