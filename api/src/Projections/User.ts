import { project } from "cmdo-events";
import { UserCreated } from "shared";

project.continuous(UserCreated, async (event) => {
  console.log("User created", event);
});
