import { Collection } from "discord.js";
import fs from "fs";

let aliases = new Collection();
let commands = new Collection();

let commandFolder = fs.readdirSync("./src/commands/");

for (let file of commandFolder) {
  let pullCmd = require(`../commands/${file.replace(".ts", "")}`);
  commands.set(pullCmd.name ? pullCmd.name : file, pullCmd);
  if (pullCmd.aliases) {
    pullCmd.aliases.forEach((alias) => aliases.set(alias, pullCmd.name));
  }
}

export { commands, aliases };
