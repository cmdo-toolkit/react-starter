import { config } from "./Config";
import { loadCollections } from "./Data/Collections";
import { mongo } from "./Lib/Mongo";
import { hts } from "./Providers/HttpServer";
import { wss } from "./Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Main
 |--------------------------------------------------------------------------------
 */

(async function main(): Promise<void> {
  await database();
  await providers();
  await routes();
  await projections();
  await start();
})();

/*
 |--------------------------------------------------------------------------------
 | Database Loader
 |--------------------------------------------------------------------------------
 |
 | Establish a connection to the database that is kept alive while the server
 | is running.
 | 
 */

async function database(): Promise<void> {
  await mongo.connect();
  await loadCollections();
}

/*
 |--------------------------------------------------------------------------------
 | Dependency Injectors
 |--------------------------------------------------------------------------------
 |
 | Register service providers for module dependencies.
 |
 */

async function providers(): Promise<void> {
  await Promise.all([import("./Providers/AccessStore"), import("./Providers/EventStore")]);
}

/*
 |--------------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------------
 */

async function routes() {
  await Promise.all([
    import("./Routes/Account"),
    import("./Routes/Api"),
    import("./Routes/Auth"),
    import("./Routes/Channels"),
    import("./Routes/Events"),
    import("./Routes/Streams"),
    import("./Routes/User")
  ]);
}

/*
 |--------------------------------------------------------------------------------
 | Projections
 |--------------------------------------------------------------------------------
 */

async function projections() {
  await Promise.all([import("./Projections/Account"), import("./Projections/User")]);
}

/*
 |--------------------------------------------------------------------------------
 | Start
 |--------------------------------------------------------------------------------
 */

async function start(): Promise<void> {
  wss.connect(hts);
  hts.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}
