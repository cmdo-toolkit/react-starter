import { subscribe } from "cmdo-events";
import { useEffect } from "react";

/**
 * Connect and sync with an event stream.
 */
export function useStream(id: string): void {
  useEffect(() => subscribe(id), [id]);
}
