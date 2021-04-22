import { Client } from "discord.js";
require("dotenv").config();
const client = new Client();
client.login(process.env.BOT_TOKEN);
export { client };
