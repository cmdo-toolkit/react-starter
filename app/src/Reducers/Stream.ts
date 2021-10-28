export type State =
  | {
      status: "pending" | "hydrating" | "started";
      error: undefined;
    }
  | {
      status: "error";
      error: string;
    };

type Action =
  | {
      type: "HYDRATING";
    }
  | {
      type: "STARTED";
    }
  | {
      type: "FAILED";
      error: Error;
    };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATING": {
      return {
        ...state,
        status: "hydrating",
        error: undefined
      };
    }
    case "STARTED": {
      return {
        ...state,
        status: "started",
        error: undefined
      };
    }
    case "FAILED": {
      return {
        ...state,
        status: "error",
        error: action.error.message
      };
    }
  }
}

export function getDefaultState(): State {
  return {
    status: "pending",
    error: undefined
  };
}
