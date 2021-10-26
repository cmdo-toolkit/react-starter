import React from "react";

import s from "./Title.module.scss";

type Props = {
  text: string;
};

export function ModuleTitle({ text }: Props) {
  return <h1 className={s.header}>{text}</h1>;
}
