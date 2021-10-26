import { getDate } from "cmdo-events";
import { format } from "date-fns";
import React, { useState } from "react";

import { Event } from "../../Data/Models/Event";
import { useQuery } from "../../Hooks/UseQuery";
import { TextInput } from "../Common/TextInput";
import { Module } from "../Template/Module";
import { ModuleTitle } from "../Template/Module";
import s from "./Events.module.scss";

export function Events() {
  const [events, setFilter] = useEventQuery();
  return (
    <Module>
      <ModuleTitle text="Events" />
      <TextInput placeholder="Find event by id, name or email" onChange={(value) => setFilter(value)} />
      {events.map(({ id, event }) => (
        <div key={id} className={s.event}>
          <div className={s.eventType}>{event.type}</div>
          <div className={s.eventDate}>{format(getDate(event.meta.created), "d-MM-Y H:m:ssS")}</div>
        </div>
      ))}
    </Module>
  );
}

function useEventQuery(): [Event[], React.Dispatch<React.SetStateAction<string>>] {
  const [filter, setFilter] = useState("");
  const events = useQuery("events", {
    filter: {
      $or: [
        {
          "event.data.id": {
            $regex: filter,
            $options: "i"
          }
        },
        {
          "event.data.name": {
            $regex: filter,
            $options: "i"
          }
        },
        {
          "event.data.email": {
            $regex: filter,
            $options: "i"
          }
        }
      ]
    },
    sort: {
      "event.meta.created": -1
    }
  });
  return [events, setFilter];
}
