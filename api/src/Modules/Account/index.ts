import { hasData } from "../../Policies/hasData";
import { route } from "../../Providers/Server";
import { create, validate } from "./Token.Controller";

route.on("account.token", [hasData(["email"]), create]);
route.on("account.validate", [hasData(["email", "token"]), validate]);
