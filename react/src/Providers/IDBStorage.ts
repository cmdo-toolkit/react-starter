import { container, Document, StorageAdapter } from "cmdo-db";
import debug from "debug";
import { del, get, set } from "idb-keyval";

const log = {
  storage: debug("storage")
};

container.set(
  "StorageAdapter",
  new (class IndexDBStorage implements StorageAdapter {
    public async set(name: string, documents: Document[]) {
      log.storage("[%s] set %O", name, documents);
      return set(name, documents);
    }

    public async get(name: string) {
      const documents = await get(name);
      if (documents) {
        log.storage("[%s] get %O", name, documents);
        return documents;
      }
      return [];
    }

    public async del(name: string) {
      log.storage("[%s] delete", name);
      return del(name);
    }
  })()
);
