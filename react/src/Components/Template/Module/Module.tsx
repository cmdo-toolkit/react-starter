import React, { ReactNode } from "react";

import s from "./Module.module.scss";

type Props = {
  children: ReactNode;
};

export function Module({ children }: Props) {
  return <div className={s.container}>{children}</div>;
}
