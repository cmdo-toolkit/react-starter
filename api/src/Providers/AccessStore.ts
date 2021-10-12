import { AccessGrantOperation, AccessGrantsData, container, Store } from "cmdo-auth";

import { mongo } from "../Lib/Mongo";

container.set(
  "Store",
  new (class AccessStore implements Store {
    private collection = "grants";

    /**
     * Set access grants for given access control id.
     *
     * @param id         - Unique persistent storage id.
     * @param acid       - Access control id.
     * @param operations - List of grant operations to perform.
     */
    public async setGrants(id: string, acid: string, operations: AccessGrantOperation[]): Promise<void> {
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

      await mongo.collection(this.collection).updateOne({ id }, update, { upsert: true });
    }

    /**
     * Get access control instance for given access control id.
     *
     * @param id - Unique persistent storage id.
     *
     * @returns grants
     */
    public async getGrants(id: string): Promise<AccessGrantsData> {
      const access = await mongo.collection(this.collection).findOne({ id });
      if (access) {
        return access.grants;
      }
      return {};
    }
  })()
);
