import * as fs from "fs";

/*
 |--------------------------------------------------------------------------------
 | Exports
 |--------------------------------------------------------------------------------
 */

export async function getModules(path: string, root: string, events: Set<string> = new Set()) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    if (dirent.isFile() && dirent.name === "index.ts") {
      events.add(`${path}/${dirent.name}`.replace(root, ".").replace("/index.ts", ""));
    }
    if (dirent.isDirectory()) {
      await getModules(`${path}/${dirent.name}`, root, events);
    }
  }
  return events;
}

export function getModuleExports(modules: any) {
  const exports: string[] = [];
  for (const path of getSortedPaths(modules)) {
    exports.push(`export * from "${path}";`);
  }
  return exports.join("\n");
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function getSortedPaths(paths: Set<string>) {
  return Array.from(paths).sort((a, b) => (a > b ? 1 : -1));
}
