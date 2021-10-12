import type { Router } from "cmdo-router";
import React, { useEffect, useState } from "react";

import { router } from "../Router";

/*
 |--------------------------------------------------------------------------------
 | Hook
 |--------------------------------------------------------------------------------
 */

//#region

export function useRouter(
  router: Router,
  preload: () => Promise<void>,
  onError: (err: any) => JSX.Element | undefined
): JSX.Element | null {
  const [view, setView] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const { pathname, search, state } = router.history.location;
    preload().then(() => {
      router
        .listen({
          render: async (components: React.ComponentType[]) => {
            setView(createReactElement(components));
          },
          error: (err: any) => {
            const component = onError(err);
            if (component) {
              setView(component);
            }
          }
        })
        .goTo(`${pathname}${search}`, state);
    });
  }, [router, preload, onError]);

  return view;
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

//#region

function createReactElement(list: React.ComponentType[], props = { ...router.params.get(), ...router.query.get() }): any {
  if (list.length === 1) {
    return React.createElement(list[0], props);
  }
  return React.createElement(list[0], props, createReactElement(list.slice(1, list.length), props));
}

//#endregion
