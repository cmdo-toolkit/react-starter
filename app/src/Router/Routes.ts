import { Route } from "cmdo-router";

import { Home } from "../Pages/Home";
import { renderAuthorized } from "./Actions/RenderAuthorized";
import { router } from "./Router";

router.register([new Route("/", [renderAuthorized([Home], "Home")])]);
