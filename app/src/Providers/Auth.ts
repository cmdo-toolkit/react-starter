import { container, GrantOperation, GrantsData, Store, TokenData } from "cmdo-auth";
import decode from "jwt-decode";

import { socket } from "./Socket";

type Data = TokenData;

container
  .set("Token", {
    async decode(value: string) {
      return decode<Data>(value);
    }
  })
  .set(
    "Store",
    new (class AuthStore implements Store {
      public async setGrants(id: string, acid: string, operations: GrantOperation[]): Promise<void> {
        const update: any = {};
        const $set: any = {};
        const $unset: any = {};

        for (const operation of operations) {
          switch (operation.type) {
            case "set": {
              const { resource, action, data = true } = operation;
              $set[`grants.${acid}.${resource}.${action}`] = data;
              break;
            }
            case "unset": {
              const { resource, action } = operation;
              let path = `grants.${acid}.${resource}`;
              if (action) {
                path += `.${action}`;
              }
              $unset[path] = "";
              break;
            }
          }
        }

        if (Object.keys($set).length) {
          update.$set = $set;
        }

        if (Object.keys($unset).length) {
          update.$set = $unset;
        }

        await socket.send("auth.setGrants", { id, update });
      }

      public async getGrants(id: string): Promise<GrantsData> {
        return socket.send("auth.getGrants", { id });
      }
    })()
  );
