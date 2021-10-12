import { Action, Route } from "cmdo-router";
import { createBrowserHistory, Router } from "cmdo-router";

import { Layout } from "./Components/Template/Layout";
import { Auth } from "./Views/Auth";
import { Dashboard } from "./Views/Dashboard";

export const router = new Router(createBrowserHistory());

/*
 |--------------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------------
 */

//#region

router.register([new Route("/", [render([Auth], "Auth")]), new Route("/dashboard", [render([Layout, Dashboard], "Dashboard")])]);

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

//#region

function render(components: any[], title: string): Action {
  return async function () {
    setPageTitle(title);
    return this.render(components);
  };
}

function setPageTitle(title: string): void {
  document.title = `Toolkit | ${title}`;
}

//#endregion
