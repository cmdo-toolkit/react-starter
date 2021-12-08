import { nanoid } from "nanoid";
import { stores } from "stores";

import { collection } from "../../Collections";
import { Account as Attributes, Status } from "../../Types/Account";
import { Token } from "./Token";

export class Account {
  public readonly id: Attributes["id"];
  public readonly status: Attributes["status"];
  public readonly username: Attributes["username"];
  public readonly email: Attributes["email"];
  public readonly token: Token;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.status = attributes.status;
    this.username = attributes.username;
    this.email = attributes.email;
    this.token = new Token(attributes.id, attributes.token);
  }

  /*
   |--------------------------------------------------------------------------------
   | Factories
   |--------------------------------------------------------------------------------
   */

  public static async create(email: string) {
    await stores.account.create({ accountId: nanoid(), email });
    return this.getByEmail(email);
  }

  public static async getByEmailOrCreate(email: string) {
    const account = await Account.getByEmail(email);
    if (account) {
      return account;
    }
    return Account.create(email);
  }

  public static async getByUsername(username: string) {
    const record = await collection.accounts.findOne({ username });
    if (record) {
      return new Account(record);
    }
  }

  public static async getByEmail(email: string) {
    const record = await collection.accounts.findOne({ email });
    if (record) {
      return new Account(record);
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  public is(status: Status) {
    return this.status === status;
  }

  /*
   |--------------------------------------------------------------------------------
   | Serializers
   |--------------------------------------------------------------------------------
   */

  public toJSON(attributes: Partial<Attributes>) {
    return {
      id: this.id,
      status: this.status,
      username: this.username,
      email: this.email,
      token: this.token.value,
      ...attributes
    };
  }
}
