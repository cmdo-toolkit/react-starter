import { Email } from "../Lib/Form/Inputs/Email";
import { forms } from "../Lib/Forms";
import { Token } from "../Lib/Token";
import { EventEmitter } from "./EventEmitter";
import { socket } from "./Socket";

type Step = "provider" | "token";

export const authentication = new (class Authentication extends EventEmitter<{
  step(value: Step, error?: string): void;
}> {
  public step: Step = "provider";

  public readonly email = new Email();
  public readonly token = new Token();

  constructor() {
    super();
    this.next = this.next.bind(this);
  }

  /*
   |--------------------------------------------------------------------------------
   | Triggers
   |--------------------------------------------------------------------------------
   */

  //#region

  public next() {
    switch (this.step) {
      case "provider": {
        this.sendProvider();
        break;
      }
    }
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Actions
   |--------------------------------------------------------------------------------
   */

  //#region

  public async sendProvider() {
    const check = this.email.check();
    if (check.valid) {
      socket
        .post("account.token", { email: this.email.get() })
        .then(() => {
          this.goToToken();
        })
        .catch((error) => {
          this.goToProvider(error);
        });
    } else {
      this.goToProvider(check.message);
    }
  }

  public async sendToken() {
    socket
      .post("account.validate", { email: this.email.get(), token: this.token.toString() })
      .then(() => {
        alert("Success");
      })
      .catch((error) => {
        this.goToToken(error);
      });
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Transitions
   |--------------------------------------------------------------------------------
   */

  //#region

  public goToProvider(error?: string): void {
    this.setStep("provider", error);
  }

  public goToToken(error?: string): void {
    this.setStep("token", error);
    forms.focus("connect", "token");
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  //#region

  public setStep(step: Step, error?: string) {
    this.step = step;
    this.emit("step", step, error);
  }

  public reset() {
    this.email.reset();
  }

  //#endregion
})();
