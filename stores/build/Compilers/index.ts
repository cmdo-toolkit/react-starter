import * as fs from "fs";
import * as path from "path";

import { getEventExports, getEventImports, getEvents } from "./Events";

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

export async function stores(cwd: string) {
  const src = path.resolve(cwd);
  await writeStores(src, await getAccess(src), await getEvents(src, src), await getStores(src));
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

async function getAccess(src: string) {
  const access: Map<string, string> = new Map();
  const dir = await fs.promises.opendir(src);
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      access.set(dirent.name, `${src}/${dirent.name}`);
    }
  }
  return access;
}

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

async function writeStores(src: string, access: Map<string, string>, events: any, stores: Map<string, string>) {
  writeStoresMod(src, {
    access: getAccessImports(src, access) + getAccessExports(access),
    events: getEventImports(events) + getEventExports(events),
    stores: getStoresImports(src, stores) + getStoresExports(stores)
  });
}

function writeStoresMod(cwd: string, output: any) {
  const index = fs.readFileSync(path.join(process.cwd(), "build/Templates/index"), "utf-8");
  fs.writeFileSync(
    path.resolve(cwd, "index.ts"),
    index.replace("$access", output.access).replace("$events", output.events).replace("$stores", output.stores)
  );
}

function getAccessImports(src: string, stores: Map<string, string>) {
  let imports = "";
  for (const [store, path] of stores) {
    imports += `import * as ${store.toLowerCase()}Access from "${path.replace(src, ".")}/Access";\n`;
  }
  return imports + "\n";
}

function getStoresImports(src: string, stores: Map<string, string>) {
  let imports = "";
  for (const [store, path] of stores) {
    imports += `import * as ${store.toLowerCase()}Actions from "${path.replace(src, ".")}/Actions";\n`;
  }
  return imports + "\n";
}

function getStoresExports(stores: Map<string, string>) {
  const exports = [];
  for (const [store] of stores) {
    exports.push(store.toLowerCase());
  }
  const print = [];
  print.push(`export const stores = {\n  ${exports.map((key) => `${key}: ${key}Actions`).join(",\n  ")}\n};`);
  return print.join("");
}

function getAccessExports(stores: Map<string, string>) {
  const exports = [];
  for (const [store] of stores) {
    exports.push(store.toLowerCase());
  }
  const print = [];
  print.push(`export const access = {\n  ${exports.map((key) => `${key}: ${key}Access`).join(",\n  ")}\n};`);
  return print.join("");
}
