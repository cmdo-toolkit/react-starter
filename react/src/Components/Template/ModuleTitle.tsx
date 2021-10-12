import React from "react";

import { StyleSheet } from "../../Lib/StyleSheet";

type Props = {
  text: string;
};

export function ModuleTitle({ text }: Props) {
  return <h1 style={s.header}>{text}</h1>;
}

const s = StyleSheet.create({
  header: {
    fontSize: 15,
    fontWeight: 500
  }
});
