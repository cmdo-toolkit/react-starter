import { isDefined } from "../Actions";
import { Value } from "../Value";

export class Email extends Value<string> {
  constructor() {
    super([isDefined("You must provide a email")]);
  }
}
