import { getDate } from "cmdo-events";
import { format } from "date-fns";
import React, { useState } from "react";

import { useQuery } from "../../Hooks/UseQuery";
import { Event } from "../../Models/Event";
import s from "./Events.module.scss";

export function Events() {
  const [events, setFilter] = useEventQuery();
  return (
    <div>
      <h1>Events</h1>
      <input placeholder="Find event by id, name or email" onChange={(e) => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Data</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map(({ event }) => (
              <tr key={event.hash}>
                <td>{event.type}</td>
                <td>
                  <pre>{JSON.stringify(event.data, null, 2)}</pre>
                </td>
                <td>{format(getDate(event.meta.created), "d-MM-Y H:m:ssS")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
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
