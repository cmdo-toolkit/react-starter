import React from "react";

import { Events } from "../../Components/Events";
import { Users } from "../../Components/Users";
import { useStream } from "../../Hooks/UseStream";
import s from "./Home.module.scss";

export function Home(): JSX.Element | null {
  const { loading, error } = useStream("toolkit");

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <Users />
      <Events />
    </div>
  );
}
