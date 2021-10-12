import { EventEmitter } from "../Providers/EventEmitter";

type Events = {
  focus(id: string, target?: string): void;
  clear(id: string, target?: string): void;
  select(id: string, value: any): void;
};

export const forms = new (class Forms extends EventEmitter<Events> implements Events {
  public focus(id: string, target?: string): void {
    this.emit("focus", id, target);
  }
  public clear(id: string, target?: string): void {
    this.emit("clear", id, target);
  }
  public select(id: string, value: any): void {
    this.emit("select", id, value);
  }
})();
