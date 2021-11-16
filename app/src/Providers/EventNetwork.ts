import { container, EventDescriptor, EventNetwork, StreamNetworkHandler } from "cmdo-events";

import { socket } from "./Socket";

const streams: Record<string, StreamNetworkHandler> = {};

container.set(
  "EventNetwork",
  new (class SocketEventNetwork implements EventNetwork {
    public async push(descriptors: EventDescriptor[]): Promise<void> {
      return socket.send("streams.push", { descriptors });
    }
    public async pull(stream: string, hash?: string): Promise<EventDescriptor[]> {
      return socket.send("streams.pull", { stream, hash });
    }
    public subscribe(stream: string, handler: StreamNetworkHandler): void {
      socket.streams.join(stream);
      streams[stream] = handler;
    }
    public unsubscribe(stream: string): void {
      socket.streams.leave(stream);
      delete streams[stream];
    }
  })()
);

socket.on("event", (descriptor) => {
  streams[descriptor.stream]?.(descriptor);
});
