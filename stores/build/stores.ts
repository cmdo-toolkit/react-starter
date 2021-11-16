import * as fs from "fs";
import * as path from "path";

import { getModuleExports, getModules } from "./Compilers/Modules";
import { stores } from "./Compilers/Stores";

type Output = {
  modules: string;
};

function write(cwd: string, output: Output) {
  const index = fs.readFileSync(path.join(process.cwd(), "build/Templates/index"), "utf-8");
  fs.writeFileSync(path.resolve(cwd, "index.ts"), index.replace("$modules", output.modules));
}

async function clean(src: string) {
  try {
    await fs.promises.unlink(path.join(src, "index.ts"));
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
}

(async function () {
  const src = path.resolve(process.cwd(), "src");

  await clean(src);
  await stores(src);

  const modules = await getModules(src, src);
  const output = {
    modules: getModuleExports(modules)
  };

  write(src, output);
})();
