import { Stream } from "cmdo-events";
import { useEffect } from "react";

/**
 * Connect and sync with an event stream.
 */
export function useStream(name: string): void {
  useEffect(() => Stream.get(name).subscribe(), [name]);
}
