import * as fs from "fs";
import * as path from "path";

import { getActions, getActionsImports } from "./Actions";

/*
 |--------------------------------------------------------------------------------
 | Store
 |--------------------------------------------------------------------------------
 */

export async function store(store: string, src: string) {
  const actions = await getActions(src, src);
  writeStoreMod(src, {
    store: getActionsImports(actions)
  });
}

/*
 |--------------------------------------------------------------------------------
 | Output
 |--------------------------------------------------------------------------------
 */

function writeStoreMod(cwd: string, output: any) {
  const index = fs.readFileSync(path.join(process.cwd(), "build/Templates/Stores/Store"), "utf-8");
  fs.writeFileSync(path.resolve(cwd, "store.ts"), index.replace("$store", output.store));
}
