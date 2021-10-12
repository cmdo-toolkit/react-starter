import { customAlphabet } from "nanoid";

import { mongo } from "../Mongo";
import { Attributes } from "./Attributes";

const generateToken = customAlphabet("1234567890", 5);

export class Token {
  public readonly id: string;
  public readonly value: string;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }

  public async create(type: "email" | "sms" | "console") {
    const token = generateToken();
    await mongo.collection<Attributes>("accounts").updateOne({ id: this.id }, { $set: { token } });
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
    await mongo.collection<Attributes>("accounts").updateOne({ id: this.id }, { $set: { token: "" } });
  }
}
