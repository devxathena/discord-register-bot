const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild) => {
  message.delete();
  const kayitsiz = process.env.UNREGISTERED_ROLE;
  const kayit_cagir_kanali = process.env.REGISTER_WRITE;

  const kayitcagirKanal = message.guild.channels.cache.get(kayit_cagir_kanali);

  const zatenAcik = new MessageEmbed()
    .setDescription("❌ | Kayıt zaten aktif durumda!")
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("RED");

  const acildi = new MessageEmbed()
    .setDescription("✅ | Kayıt başarıyla aktif edildi!")
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("GREEN");

  if (registrationService === false) {
    const seslikanal1 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID);
    const seslikanal2 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID2);
    const seslikanal3 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID3);
    const seslikanal4 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID4);
    const seslikanal5 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID5);
    global.registrationService = true;
    message.reply(acildi).then((msg) => msg.delete({ timeout: 3500 }));
    await kayitcagirKanal.updateOverwrite(kayitsiz, {
      SEND_MESSAGES: true,
      READ_MESSAGE_HISTORY: true,
    });
    await seslikanal1.updateOverwrite(kayitsiz, {
      CONNECT: true,
    });
    await seslikanal2.updateOverwrite(kayitsiz, {
      CONNECT: true,
    });
    await seslikanal3.updateOverwrite(kayitsiz, {
      CONNECT: true,
    });
    await seslikanal4.updateOverwrite(kayitsiz, {
      CONNECT: true,
    });
    await seslikanal5.updateOverwrite(kayitsiz, {
      CONNECT: true,
    });
  } else {
    return message
      .reply(zatenAcik)
      .then((msg) => msg.delete({ timeout: 3500 }));
  }
};

exports.conf = {
  aliases: ["k-aç", "hoşgeldin-aç", "hg-aç", "k-ac", "hg-ac", "hosgeldin-ac"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "kayıt-aç",
};
