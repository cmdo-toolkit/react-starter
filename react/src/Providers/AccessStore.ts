import type { AccessGrantOperation, AccessGrantsData, Store } from "cmdo-auth";
import { container } from "cmdo-auth";

container.set(
  "Store",
  new (class AccessStore implements Store {
    public async setGrants(id: string, acid: string, operations: AccessGrantOperation[]): Promise<void> {
      // ...
    }
    public async getGrants(id: string): Promise<AccessGrantsData> {
      return {};
    }
  })()
);
