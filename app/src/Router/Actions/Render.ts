import { Action } from "cmdo-router";

import { setPageTitle } from "../../Utils/Dom";

export function render(components: any[], title: string): Action {
  return async function () {
    setPageTitle(title);
    return this.render(components);
  };
}
