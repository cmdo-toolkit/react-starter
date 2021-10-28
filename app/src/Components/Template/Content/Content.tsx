import React, { PropsWithChildren } from "react";

import s from "./Content.module.scss";

type Props = PropsWithChildren<any>;

export function Content({ children }: Props) {
  return <div className={s.container}>{children}</div>;
}
