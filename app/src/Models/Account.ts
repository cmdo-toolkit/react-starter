import { Document, Model } from "cmdo-db";
import { stores } from "stores";

type Attributes = Document & {
  name?: string;
  email: string;
};

export class Account extends Model<Attributes> {
  public static readonly $collection = "accounts";

  public readonly name: Attributes["name"];
  public readonly email: Attributes["email"];

  constructor(document: Attributes) {
    super(document);

    this.name = document.name;
    this.email = document.email;

    Object.freeze(this);
  }

  /*
   |--------------------------------------------------------------------------------
   | Actions
   |--------------------------------------------------------------------------------
   */

  public setName(name: string) {
    return stores.account.setAlias({ accountId: this.id, alias: name });
  }

  public setEmail(email: string) {
    return stores.account.setEmail({ accountId: this.id, email });
  }

  /*
   |--------------------------------------------------------------------------------
   | Serializer
   |--------------------------------------------------------------------------------
   */

  public toJSON(): Attributes {
    return super.toJSON({
      name: this.name,
      email: this.email
    });
  }
}
