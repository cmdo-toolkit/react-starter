import { container, EventNetwork } from "cmdo-events";

container.set(
  "EventNetwork",
  new (class SocketEventNetwork extends EventNetwork {
    public async validate(): Promise<boolean> {
      return false;
    }
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
