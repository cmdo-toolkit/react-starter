import { Auth } from "cmdo-auth";

import { socket } from "./Providers/Socket";

let auth = Auth.guest();

async function sign(token: string) {
  await socket.send("auth.sign", { token });
  auth = await Auth.resolve(token);
}

async function destroy() {
  await socket.send("auth.destroy");
}

export { auth, destroy, sign };
