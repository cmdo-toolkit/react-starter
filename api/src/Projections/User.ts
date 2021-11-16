import { projection } from "cmdo-events";
import { UserCreated } from "stores";

projection.on(UserCreated, async (event) => {
  console.log("User created", event);
});
