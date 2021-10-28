import type { AccessGrantsData, Store } from "cmdo-auth";
import { container } from "cmdo-auth";

container.set(
  "Store",
  new (class AccessStore implements Store {
    public async setGrants(): Promise<void> {
      // ...
    }
    public async getGrants(): Promise<AccessGrantsData> {
      return {};
    }
  })()
);
