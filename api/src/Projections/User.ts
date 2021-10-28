import { project } from "cmdo-events";
import { UserCreated } from "shared";

project.on(UserCreated, async (event) => {
  console.log("User created", event);
});
