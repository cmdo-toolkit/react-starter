import { container, EventNetwork } from "cmdo-events";

container.set(
  "EventNetwork",
  new (class SocketEventNetwork implements EventNetwork {
    public async push(): Promise<void> {
      //
    }
    public async pull() {
      return [];
    }
    public subscribe(): void {
      //
    }
    public unsubscribe(): void {
      //
    }
  })()
);
