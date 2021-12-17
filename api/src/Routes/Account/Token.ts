import { customAlphabet } from "nanoid";

import { collection } from "../../Collections";
import { config } from "../../Config";

const generateToken = customAlphabet(config.auth.token.letters, config.auth.token.length);

export class Token {
  public readonly accountId: string;
  public readonly value: string;

  constructor(accountId: string, value: string) {
    this.accountId = accountId;
    this.value = value;
  }

  public async create(type: "email" | "sms" | "console") {
    const token = generateToken();
    await collection.accounts.updateOne({ accountId: this.accountId }, { $set: { token } });
    switch (type) {
      case "email": {
        throw new Error("Email is not yet supported");
      }
      case "sms": {
        throw new Error("SMS is not yet supported");
      }
      case "console": {
        console.log("Token:", token);
        break;
      }
    }
    return token;
  }

  public validate(token: string) {
    if (this.value === "") {
      return false; // token is never valid if there is no assigned value
    }
    return this.value === token;
  }

  public async delete() {
    await collection.accounts.updateOne({ accountId: this.accountId }, { $set: { token: "" } });
  }
}
