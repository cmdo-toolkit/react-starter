import { Action as SocketAction } from "cmdo-socket";

/*
 |--------------------------------------------------------------------------------
 | Policies
 |--------------------------------------------------------------------------------
 */

export function hasData(keys: string[]): SocketAction {
  return async function (_, data) {
    const missing: string[] = [];
    for (const key of keys) {
      if (data[key] === undefined) {
        missing.push(key);
      }
    }
    if (missing.length) {
      return this.reject(`Socket Message Violation: Missing required keys '${missing.join(", ")}' in data`);
    }
    return this.accept();
  };
}
