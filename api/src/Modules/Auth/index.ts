import { hasData } from "../../Policies/hasData";
import { isSocketAuthenticated } from "../../Policies/isAuthenticated";
import { route } from "../../Providers/Server";
import { destroy, getPermissions, sign } from "./Auth.Controller";

route.on("auth.sign", [hasData(["token"]), sign]);
route.on("auth.getPermissions", [isSocketAuthenticated, hasData(["tenantId"]), getPermissions]);
route.on("auth.destroy", [destroy]);
