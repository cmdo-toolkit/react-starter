import { useEffect, useReducer } from "react";

import { EventStream } from "../Providers/EventStream";
import { getDefaultState, reducer, State } from "../Reducers/Stream";

/*
 |--------------------------------------------------------------------------------
 | Hook
 |--------------------------------------------------------------------------------
 */

//#region

export function useStream(name: string): State {
  const [state, dispatch] = useReducer(reducer, getDefaultState());

  useEffect(() => {
    const stream = new EventStream(name);

    stream.start();

    return stream.subscribe(
      "status",
      (status) => {
        switch (status) {
          case "hydrating": {
            dispatch({ type: "HYDRATING" });
            break;
          }
          case "started": {
            dispatch({ type: "STARTED" });
          }
        }
      },
      () => {
        stream.stop();
      }
    );
  }, [name]);

  return state;
}

//#endregion
