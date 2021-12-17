import { nanoid } from "nanoid";
import { Account as Attributes, stores } from "stores";

import { collection } from "../../Collections";
import { Token } from "./Token";

export class Account {
  public readonly accountId: Attributes["accountId"];
  public readonly status: Attributes["status"];
  public readonly alias: Attributes["alias"];
  public readonly name: Attributes["name"];
  public readonly email: Attributes["email"];
  public readonly token: Token;

  constructor(attributes: Attributes) {
    this.accountId = attributes.accountId;
    this.status = attributes.status;
    this.alias = attributes.alias;
    this.name = attributes.name;
    this.email = attributes.email;
    this.token = new Token(attributes.accountId, attributes.token);
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

  public is(status: Account["status"]) {
    return this.status === status;
  }

  /*
   |--------------------------------------------------------------------------------
   | Serializers
   |--------------------------------------------------------------------------------
   */

  public toJSON(attributes: Partial<Attributes>) {
    return {
      accountId: this.accountId,
      status: this.status,
      alias: this.alias,
      name: this.name,
      email: this.email,
      token: this.token.value,
      ...attributes
    };
  }
}
