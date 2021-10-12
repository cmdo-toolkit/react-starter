import React, { ReactNode } from "react";

import { useStream } from "../../Hooks/UseStream";
import { StyleSheet } from "../../Lib/StyleSheet";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";

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
    <div style={s.container}>
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "180px auto",
    gridTemplateAreas: "'sidebar content'"
  }
});
