const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
  const yetkili = process.env.STAFF_ROLE;
  const kayitCagir = process.env.REGISTER_WRITE;

  const kayitCagirMsg = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Çağır")
    .setDescription(
      ` Hey, <@&${yetkili}>!\n<@${message.author.id}> kayıt olmak istiyor!`
    )
    .setFooter(
      message.author.username + " tarafından istendi.",
      message.author.avatarURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setColor("AQUA")
    .setTimestamp();

  const kayitSesliGel = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Çağır")
    .setDescription(` Öncelikle bir sesli kanalda olmalısın!`)
    .setFooter(
      message.author.username + " tarafından istendi.",
      message.author.avatarURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setColor("RED")
    .setTimestamp();

  if (message.channel.id !== kayitCagir) return;

  if (message.member.voice.channel) {
    return message.channel.send(`<@&${yetkili}>`,kayitCagirMsg);
  }else {
    message.reply(kayitSesliGel).then((msg) => msg.delete({ timeout: 4500 }));
  }
};

exports.conf = {
  aliases: [
    "kç",
    "k-ç",
    "kc",
    "k-c",
    "kayit-cagir",
    "k-cagir",
    "k-çağır",
    "kayit-c",
    "kayit-ç",
    "kayıt-cagir",
  ],
};
exports.help = {
  name: "kayıt-çağır",
};
