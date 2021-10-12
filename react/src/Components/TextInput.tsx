import React, { InputHTMLAttributes } from "react";

import { StyleSheet } from "../Lib/StyleSheet";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (value: string) => void;
};

export function TextInput({ onChange, ...props }: Props) {
  return (
    <input
      {...props}
      style={s.input}
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
    />
  );
}

const s = StyleSheet.create({
  input: {
    boxSizing: "border-box",
    backgroundColor: "#5E606D",
    color: "#D1D4DD",
    borderRadius: 11,
    padding: "10px 15px",
    border: "none",
    width: "100%"
  }
});
