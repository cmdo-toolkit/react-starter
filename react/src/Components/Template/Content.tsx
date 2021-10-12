import React, { PropsWithChildren } from "react";

import { StyleSheet } from "../../Lib/StyleSheet";

type Props = PropsWithChildren<any>;

export function Content({ children }: Props) {
  return <div style={s.container}>{children}</div>;
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    gridArea: "content",
    backgroundColor: "#121421",
    padding: 25
  }
});
