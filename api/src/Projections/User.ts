import { projection } from "cmdo-events";
import { UserCreated } from "shared";

projection.on(UserCreated, async (event) => {
  console.log("User created", event);
});
