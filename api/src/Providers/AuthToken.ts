import { container, Token, TokenData } from "cmdo-auth";
import jwt from "jsonwebtoken";

import { config } from "../Config";

type Data = TokenData;

container.set(
  "Token",
  class JsonWebToken extends Token {
    public async decode(): Promise<this> {
      const data = jwt.decode(this.value) as Data | null;
      if (!data) {
        throw new Error("Auth Token Violation: Provided token cannot be decoded");
      }
      this.data = data;
      return this;
    }

    public async verify(): Promise<boolean> {
      return new Promise((resolve) => {
        jwt.verify(this.value, config.auth.secret, function (err) {
          resolve(err === undefined);
        });
      });
    }
  }
);
