import { container, EventDescriptor, EventNetwork, StreamNetworkHandler } from "cmdo-events";

import { socket } from "./Socket";

const streams: Record<string, StreamNetworkHandler> = {};

container.set(
  "EventNetwork",
  new (class SocketEventNetwork implements EventNetwork {
    public async emit(descriptor: EventDescriptor): Promise<void> {
      socket.send("events.add", descriptor);
    }
    public addListener(stream: string, handler: StreamNetworkHandler): void {
      socket.streams.join(stream);
      streams[stream] = handler;
    }
    public removeListener(stream: string): void {
      socket.streams.leave(stream);
      delete streams[stream];
    }
  })()
);

socket.on("event", (descriptor) => {
  streams[descriptor.stream]?.(descriptor);
});
