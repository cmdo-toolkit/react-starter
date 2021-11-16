import * as fs from "fs";
import * as path from "path";

import { getEventExports, getEventImports, getEvents } from "./Events";
import { store } from "./Store";

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

export async function stores(cwd: string) {
  const src = path.resolve(cwd, "Stores");
  const events = await getEvents(src, src);
  const stores = await getStores(src);
  for (const [key, path] of stores) {
    await store(key, path);
  }

  await writeStores(src, events, stores);
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

async function getStores(src: string) {
  const stores: Map<string, string> = new Map();
  const dir = await fs.promises.opendir(src);
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      stores.set(dirent.name, `${src}/${dirent.name}`);
    }
  }
  return stores;
}

/*
 |--------------------------------------------------------------------------------
 | Output
 |--------------------------------------------------------------------------------
 */

async function writeStores(src: string, events: any, stores: Map<string, string>) {
  writeStoresMod(src, {
    events: getEventImports(events) + getEventExports(events),
    stores: getStoresImports(src, stores) + getStoresExports(stores)
  });
}

function writeStoresMod(cwd: string, output: any) {
  const index = fs.readFileSync(path.join(process.cwd(), "build/Templates/Stores/index"), "utf-8");
  fs.writeFileSync(path.resolve(cwd, "index.ts"), index.replace("$events", output.events).replace("$stores", output.stores));
}

function getStoresImports(src: string, stores: Map<string, string>) {
  let imports = "";
  for (const [store, path] of stores) {
    imports += `import * as ${store.toLowerCase()} from "${path.replace(src, ".")}/store";\n`;
  }
  return imports + "\n";
}

function getStoresExports(stores: Map<string, string>) {
  const exports = [];
  for (const [store] of stores) {
    exports.push(store.toLowerCase());
  }
  const print = [];
  print.push(`export const stores = {\n  ${exports.join(",\n  ")}\n};`);
  return print.join("");
}
