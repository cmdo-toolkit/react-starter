import "cmdo-events";

import { Auth } from "cmdo-auth";

declare module "cmdo-events" {
  interface ActionContext {
    auth: Auth;
  }
}
