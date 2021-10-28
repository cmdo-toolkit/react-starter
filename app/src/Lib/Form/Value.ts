import { Action } from "./Actions";
import { Response } from "./Response";

type Target<Type> = {
  target: {
    value: Type;
  };
};

export class Value<Type> {
  public value?: Type;

  constructor(public readonly actions: Action<Type>[] = []) {
    this.set = this.set.bind(this);
  }

  public set({ target: { value } }: Target<Type>) {
    this.value = value;
  }

  public get() {
    if (!this.value) {
      throw new Error("Form Input Value Violation: Cannot get undefined value");
    }
    return this.value;
  }

  public check() {
    for (const action of this.actions) {
      const response = action(this.value);
      if (response.valid === false) {
        return response;
      }
    }
    return Response.valid();
  }

  public reset() {
    this.value = undefined;
  }
}
