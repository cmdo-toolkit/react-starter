import { getDate } from "cmdo-events";
import { format } from "date-fns";
import React, { useState } from "react";

import { Event } from "../../Data/Models/Event";
import { useQuery } from "../../Hooks/UseQuery";
import { StyleSheet } from "../../Lib/StyleSheet";
import { Module } from "../Template/Module";
import { ModuleTitle } from "../Template/ModuleTitle";
import { TextInput } from "../TextInput";

export function Events() {
  const [events, setFilter] = useEventQuery();
  return (
    <Module>
      <ModuleTitle text="Events" />
      <TextInput placeholder="Find event by id, name or email" onChange={(value) => setFilter(value)} />
      {events.map(({ id, event }) => (
        <div key={id} style={s.event}>
          <div style={s.eventType}>{event.type}</div>
          <div style={s.eventDate}>{format(getDate(event.meta.created), "d-MM-Y H:m:ssS")}</div>
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
    },
    args: ["toolkit"]
  });
  return [events, setFilter];
}

const s = StyleSheet.create({
  event: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    borderRadius: 11,
    marginTop: 10,
    padding: "15px 20px",
    alignItems: "center"
  },
  eventType: {
    flex: 1
  },
  eventDate: {
    color: "#5F636F",
    flex: 1,
    fontSize: 12,
    textAlign: "right"
  }
});
