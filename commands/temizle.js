const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
  const tumMsg = await message.channel.messages.fetch({ limit: 100 });
  if (tumMsg) {
    await message.channel.bulkDelete(tumMsg, true);
  } else {
    return;
  }
};
exports.conf = {
  aliases: ["t", "c", "clear", "p", "purge"],
};
exports.permission = ["ADMINISTRATOR"];
exports.help = {
  name: "temizle",
};
