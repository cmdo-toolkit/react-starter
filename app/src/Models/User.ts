import { Document, Model } from "cmdo-db";
import { stores } from "stores";

type Attributes = Document & {
  name: string;
  email: string;
};

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

  /*
   |--------------------------------------------------------------------------------
   | Actions
   |--------------------------------------------------------------------------------
   */

  public setName(name: string) {
    return stores.user.setName({ id: this.id, name });
  }

  public setEmail(email: string) {
    return stores.user.setEmail({ id: this.id, email });
  }

  public remove() {
    return stores.user.remove({ id: this.id });
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
