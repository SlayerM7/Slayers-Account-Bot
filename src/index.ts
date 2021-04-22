import { commandHandler } from "./utils/commandHandler";
import { client } from "./client/client";
import { commands, aliases } from "./utils/commands";
import { dataOptions } from "./models/dataOptions";
import { checkDB } from "./functions/checkDB";
import { data as dataParams } from "./models/interfaces/data";
import events from "./utils/events";
import { check } from "./utils/working";

const { slayersDB } = require("slayer.db");
const db = <dataParams>new slayersDB(dataOptions);

require("dotenv").config();
let prefixToExport = process.env.PREFIX;
setInterval(() => {
  check(db);
});

checkDB();
events.run(client);

client.on("message", (message) => {
  commandHandler(message);
});

client.on("messageUpdate", (_, newMessage) => {
  commandHandler(newMessage);
});

export { client, db, prefixToExport, commands, aliases };
