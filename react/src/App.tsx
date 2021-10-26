import "./App.scss";

import React, { Fragment } from "react";

import { RouteLoader } from "./Components/Common/RouteLoader";
import { useRouter } from "./Hooks/UseRouter";
import { router } from "./Router";
import { setup } from "./Setup";

/*
 |--------------------------------------------------------------------------------
 | App
 |--------------------------------------------------------------------------------
 */

export function App(): JSX.Element {
  const view = useRouter(router, setup, error);
  if (!view) {
    return (
      <Fragment>
        <RouteLoader />
        <div className="flex h-screen">
          <div className="m-auto text-indigo-500">Loader</div>
        </div>
      </Fragment>
    );
  }
  return view;
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

/**
 * Handle routing errors.
 *
 * @param error
 */
function error(err: any): JSX.Element {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {err.message ? (
          <pre>
            {err.message}
            <br />
            {err.stack}
          </pre>
        ) : (
          <code>{JSON.stringify(err, null, 2)}</code>
        )}
      </div>
    </div>
  );
}
