import * as fs from "fs";

/*
 |--------------------------------------------------------------------------------
 | Exports
 |--------------------------------------------------------------------------------
 */

export async function getEvents(path: string, root: string, events: Record<string, unknown> = {}) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    if (dirent.isFile() && path.includes("Events")) {
      events[dirent.name.replace(".ts", "")] = `${path}/${dirent.name}`.replace(root, ".").replace(".ts", "");
    }
    if (dirent.isDirectory()) {
      await getEvents(`${path}/${dirent.name}`, root, events);
    }
  }
  return events;
}

export function getEventImports(events: any) {
  let imports = "";
  for (const [event, path] of getSortedPaths(events)) {
    imports += `import { ${event} } from "${path}";\n`;
  }
  return imports + "\n";
}

export function getEventExports(events: any) {
  const exports = [];
  for (const event of getSortedEvents(events)) {
    exports.push(event);
  }
  return getExportPrint(exports);
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function getExportPrint(events: any) {
  const print = [];

  print.push(`export type Event =\n  | ${events.join("\n  | ")};\n\n`);
  print.push(`export const events = {\n  ${events.join(",\n  ")}\n};\n\n`);
  print.push(`export {\n  ${events.join(",\n  ")}\n};`);

  return print.join("");
}

function getSortedPaths(map: any) {
  const paths = [];
  for (const event in map) {
    paths.push([event, map[event]]);
  }
  return paths.sort((a, b) => (a[1] > b[1] ? 1 : -1));
}

function getSortedEvents(map: any) {
  const events = [];
  for (const event in map) {
    events.push(event);
  }
  return events.sort();
}
