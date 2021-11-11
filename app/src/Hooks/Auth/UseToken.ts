import { useEffect } from "react";

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
          .then(() => {
            localStorage.setItem("token", "faker");
            router.reload();
          })
          .catch((error: any) => {
            alert(error);
          });
      }
    }
  ];
}
