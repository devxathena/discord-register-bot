const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
  message.delete();

  const uRole = process.env.FIRST_JOIN_ROLE;

  let user = message.guild.members.cache.filter(
    (m) => m.roles.cache.filter((r) => r.id !== message.guild.id).size == 0
  );

  const everyone = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setColor("GREEN")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setDescription(
      `Sunucumuzda rolü olmayan **` +
        user.size +
        `** kişiye <@&${uRole}> rolü verildi!`
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp();
    
    user.forEach((r) => {
    r.roles.add(`${uRole}`);
  });

  message.reply(everyone).then((msg) => msg.delete({ timeout: 4250 }))
};
exports.conf = {
  aliases: ["ev"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "everyone",
};
