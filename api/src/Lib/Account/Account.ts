import { mongo } from "../Mongo";
import { Attributes, Status } from "./Attributes";
import { event } from "./Event";
import { Token } from "./Token";

const COLLECTION_NAME = "accounts";

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
    return new Promise<Account>((resolve, reject) => {
      event.create(email, (error, attributes) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Account(attributes));
        }
      });
    });
  }

  public static async getByEmailOrCreate(email: string) {
    const account = await Account.getByEmail(email);
    if (account) {
      return account;
    }
    return Account.create(email);
  }

  public static async getByUsername(username: string) {
    const record = await mongo.collection<Attributes>(COLLECTION_NAME).findOne({ username });
    if (record) {
      return new Account(record);
    }
  }

  public static async getByEmail(email: string) {
    const record = await mongo.collection<Attributes>(COLLECTION_NAME).findOne({ email });
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
