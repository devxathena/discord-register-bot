const {MessageEmbed} = require("discord.js");
const voice_ch = process.env.VOICE_CHANNEL;

module.exports.run = async (client, message, channel, guild, args, params) => {
    message.delete();
    const kanal = client.channels.cache.get(voice_ch)
    kanal.join();

    const embıd = new MessageEmbed()
        .setDescription("Başarıyla ses kanalına tekrardan girdim!")
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail(guild.iconURL({dynamic: true, size: 1024}))

    message.channel.send(embıd);

};
exports.conf = {
    aliases: ["ses-gir", "s-gir", "sg", "s-g", "gir"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
    name: "sese-gir",
};
