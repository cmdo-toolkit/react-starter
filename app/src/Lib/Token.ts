export class Token {
  public values: string[] = [];

  public get length(): number {
    return this.values.length;
  }

  public set(index: number, value: string) {
    this.values[index] = value;
  }

  public reset() {
    this.values = [];
  }

  public toString() {
    return this.values.join("");
  }
}
