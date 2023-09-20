const { Client, Intents } = require("discord.js");
const intents = new Intents(32767);
const fs = require("fs");
const client = new Client({ intents, fetchAllMembers: true });
global.registrationService = true;
require("./main/loader")(fs, client, Client, Intents);