import { AnimationControls, TargetAndTransition, VariantLabels } from "framer-motion";
import { CSSProperties, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

import { authentication } from "../Providers/Authentication";

type Animate = boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;

type State = {
  step: "provider" | "token";
  form: {
    email: typeof authentication.email.set;
    token: (index: number, value: string) => void;
  };
  content: {
    ref: any;
  };
  provider: {
    style: CSSProperties;
    animate: Animate;
  };
  token: {
    style: CSSProperties;
    animate: Animate;
  };
};

type Actions = {
  next: typeof authentication.next;
};

export function useAuthentication(): [State, Actions] {
  const { width, height, ref } = useResizeDetector();

  const [animate, setAnimate] = useState({
    provider: {
      left: 0
    },
    token: {
      left: width
    }
  });

  useEffect(() => {
    if (width) {
      return authentication.subscribe("step", (step) => {
        switch (step) {
          case "provider": {
            setAnimate({
              provider: {
                left: 0
              },
              token: {
                left: width
              }
            });
            break;
          }
          case "token": {
            setAnimate({
              provider: {
                left: -width
              },
              token: {
                left: 0
              }
            });
            break;
          }
        }
      });
    }
  }, [width]);

  return [
    {
      step: animate.provider.left === 0 ? "provider" : "token",
      form: {
        email: authentication.email.set,
        token: (index: number, value: string) => {
          authentication.token.set(index, value);
          if (authentication.token.length === 5) {
            authentication.sendToken();
          }
        }
      },
      content: {
        ref
      },
      provider: {
        style: {
          width,
          height
        },
        animate: animate.provider
      },
      token: {
        style: {
          left: width,
          width,
          height
        },
        animate: animate.token
      }
    },
    {
      next: authentication.next
    }
  ];
}
