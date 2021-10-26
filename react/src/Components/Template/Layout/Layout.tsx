import React, { ReactNode } from "react";

import { useStream } from "../../../Hooks/UseStream";
import { Content } from "../Content";
import { Sidebar } from "../Sidebar";
import s from "./Layout.module.scss";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const { status, error } = useStream("toolkit");

  if (status === "error") {
    return <div>Something went wrong: {error}</div>;
  }

  if (status === "pending") {
    return <div>Connecting to stream</div>;
  }

  if (status === "hydrating") {
    return <div>Syncing with stream</div>;
  }

  return (
    <div className={s.container}>
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
