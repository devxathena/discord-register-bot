const fs = require("fs");
const Discord = require("discord.js");

module.exports = (fs, client, Client, Intents) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.staffJoined = false;
    client.voiceConnection = null;
    client.channelID = null;

    require("dotenv").config();
    const token = process.env.TOKEN;
    const clientID = process.env.CLIENT_ID;
    const welcomeSound = process.env.WELCOME_SOUND;
    const closedSound = process.env.CLOSED_SOUND;
    const staffSound = process.env.STAFF_SOUND;
    const authors = process.env.AUTHORS;
    const guildID = process.env.GUILD_ID;
    const voiceCH = process.env.VOICE_CHANNEL;
    const staffRole = process.env.MIN_STAFF_ROLE;
    const prefix = process.env.PREFIX;
    const registerCH = process.env.REGISTER_CHANNEL;
    const memberRole = process.env.MEMBER_ROLE;
    const unregisteredRole = process.env.UNREGISTERED_ROLE;

    /**
     *
     * @param {Client} Voice
     */

    require("../events/guildMemberRemove")(fs, client, Client, Intents, Discord);
    require("../events/guildMemberAdd")(fs, client, Client, Intents, Discord);
    require("../events/messageReactionAdd")(fs, client, Client, Intents, Discord);
    require("../events/messageReactionRemove")(fs, client, Client, Intents, Discord);
    require("../events/message")(client, prefix);
    require("../events/ready")(client, playVoice, guildID, voiceCH);
    require("../events/voiceStateUpdate")(client, playVoice);
    require("./Main")(
        client,
        authors,
        token,
        staffSound,
        welcomeSound,
        closedSound,
        staffRole
    );

    async function playVoice(client) {
        const voice_ch = process.env.VOICE_CHANNEL;
        try {
            let Path;
            if (client.staffJoined) {
                Path = "./" + staffSound;
            } else if (registrationService === true) {
                Path = "./" + welcomeSound;
            } else {
                Path = "./" + closedSound;
            }

            if (!client.user.voice || !client.voiceConnection) {
                let kanal = await client.channels.cache.get(voice_ch);
                try {
                    await kanal.join();
                } catch (err) {
                    console.log(client.user.id);
                    console.log(kanal);
                    return console.log(
                        " ❌ | Kanala girerken şu hatayı yakaladım: " + err
                    );
                }
            }
            client.voice.connections.forEach((connection) => {
                let kanal = client.channels.cache.get(voice_ch);
                connection.play(Path, {
                    volume: 1,
                })
                    .on("finish", async () => {
                        if (client.staffJoined === true) return;
                        if(kanal.members.count >= 2) return await playVoice(client);
                    });
            })

        } catch (err) {
            return console.log(
                " ❌ | Ses dosyasını oynatırken şu hatayı yakaladım: " + err
            );
        }
    }

    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);
        console.log(` ${files.length} komut yüklenecek 🔥`);
        files.forEach((f) => {
            let props = require(`../commands/${f}`);
            console.log(` 👌 Komut yüklendi: ${props.help.name}.`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, props.help.name);
            });
        });
    });

    fs.readdir("./events/", (_err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            let eventName = file.split(".")[0];
            console.log(` 👌 Event yüklendi: ${eventName}`);
        });
    });

    client.reload = (command) => {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(`../commands/${command}`)];
                let cmd = require(`../commands/${command}`);
                client.commands.delete(command);
                client.aliases.forEach((cmd, alias) => {
                    if (cmd === command) client.aliases.delete(alias);
                });
                client.commands.set(command, cmd);
                cmd.conf.aliases.forEach((alias) => {
                    client.aliases.set(alias, cmd.help.name);
                });
                resolve();
                console.log(` 👌 Yüklenen komut: ${cmd.help.name}.`);
            } catch (e) {
                reject(e);
            }
        });
    };

    client.load = (command) => {
        return new Promise((resolve, reject) => {
            try {
                let cmd = require(`../commands/${command}`);
                client.commands.set(command, cmd);
                cmd.conf.aliases.forEach((alias) => {
                    client.aliases.set(alias, cmd.help.name);
                });
                resolve();
                console.log(` 👌 Yüklenen komut: ${cmd.help.name}.`);
            } catch (e) {
                reject(e);
            }
        });
    };

    client.unload = (command) => {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(`../commands/${command}`)];
                let cmd = require(`../commands/${command}`);
                client.commands.delete(command);
                client.aliases.forEach((cmd, alias) => {
                    if (cmd === command) client.aliases.delete(alias);
                });
                resolve();
                console.log(` 👌 Silinen komut: ${cmd.help.name}.`);
            } catch (e) {
                reject(e);
            }
        });
    };
};
