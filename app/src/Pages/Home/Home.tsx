import React from "react";

import { Events } from "../../Components/Events";
import { Users } from "../../Components/Users";
import { useStream } from "../../Hooks/UseStream";
import s from "./Home.module.scss";

export function Home(): JSX.Element | null {
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
      <Users />
      <Events />
    </div>
  );
}
