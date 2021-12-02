import { useEffect } from "react";

import { sign } from "../../Auth";
import { socket } from "../../Providers/Socket";
import { router } from "../../Router";
import { InputsRef, usePin } from "../UsePin";

type Actions = {
  submit(): void;
};

export function useToken(email: string): [InputsRef, Actions] {
  const [inputs, { focus, data }] = usePin();

  useEffect(() => {
    focus(0);
  }, []);

  return [
    inputs,
    {
      submit() {
        socket
          .send("account.validate", { email, token: data() })
          .then(({ token }) => {
            localStorage.setItem("token", token);
            sign(token).then(() => {
              router.reload();
            });
          })
          .catch((error: any) => {
            alert(error);
          });
      }
    }
  ];
}
