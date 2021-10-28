import React from "react";

import logo from "../../Assets/toolkit-logo.png";
import s from "./Home.module.scss";

export function Home(): JSX.Element | null {
  return (
    <div className={s.container}>
      <img className={s.logo} src={logo} />
      CMDO Toolkit Starter
    </div>
  );
}
