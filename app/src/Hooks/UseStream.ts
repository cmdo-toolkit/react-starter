import { useEffect, useReducer } from "react";

import { EventStream } from "../Providers/EventStream";
import { getDefaultState, reducer, State } from "../Reducers/Stream";

/**
 * Connect and sync with an event stream.
 */
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
