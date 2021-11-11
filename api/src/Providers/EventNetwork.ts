import { container, EventNetwork } from "cmdo-events";

container.set(
  "EventNetwork",
  new (class SocketEventNetwork implements EventNetwork {
    public async emit(): Promise<void> {
      // socket.send("events.add", descriptor);
    }
    public addListener(): void {
      // socket.streams.join(stream);
      // streams[stream] = handler;
    }
    public removeListener(): void {
      // socket.streams.leave(stream);
      // delete streams[stream];
    }
  })()
);
