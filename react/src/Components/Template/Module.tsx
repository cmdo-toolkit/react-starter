import "./module.css";

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Module({ children }: Props) {
  return <div className="container">{children}</div>;
}
