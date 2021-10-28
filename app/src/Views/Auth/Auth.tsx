import { motion } from "framer-motion";
import React from "react";

import graphic from "../../Assets/auth-graphic.jpg";
import { Pin } from "../../Components/Common/Pin";
import { useAuthentication } from "../../Hooks/UseAuthentication";
import s from "./Auth.module.scss";

export function Auth() {
  const [{ step, form, content, provider, token }, { next }] = useAuthentication();
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.header}>Connect to Toolkit</div>
        <div className={s.content} {...content}>
          <motion.div className={s.step} {...provider}>
            <input
              className={s.email}
              placeholder="Enter email address"
              onChange={form.email}
              onKeyUp={({ key }) => {
                if (key === "Enter") {
                  next();
                }
              }}
            />
          </motion.div>
          <motion.div className={s.step} {...token}>
            <Pin id="connect" name="token" onChange={form.token} />
          </motion.div>
        </div>
        <div className={s.footer}>
          {step === "provider" ? <button onClick={next}>Continue</button> : <p>Enter the token we have sent</p>}
        </div>
        <div className={s.graphics} style={{ backgroundImage: `url(${graphic})` }} />
      </div>
    </div>
  );
}
