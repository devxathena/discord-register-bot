const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild) => {
  const kayitsiz = process.env.UNREGISTERED_ROLE;
  const kayit_cagir_kanali = process.env.REGISTER_WRITE;

  const kayitcagirKanal = message.guild.channels.cache.get(kayit_cagir_kanali);

  const zatenKapali = new MessageEmbed()
    .setDescription("❌ | Kayıt zaten kapalı durumda!")
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("RED");

  const kapandi = new MessageEmbed()
    .setDescription("✅ | Kayıt başarıyla kapatıldı! ")
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("GREEN");

  if (registrationService === true) {
    const seslikanal1 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID);
    const seslikanal2 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID2);
    const seslikanal3 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID3);
    const seslikanal4 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID4);
    const seslikanal5 = message.guild.channels.cache.get(process.env.REGISTER_VOICE_CHANNEL_ID5);
    global.registrationService = false;
    const tumMsg = await message.channel.messages.fetch({ limit: 100 });
    await kayitcagirKanal.updateOverwrite(kayitsiz, {
      SEND_MESSAGES: false,
      READ_MESSAGE_HISTORY: true,
    });
    await seslikanal1.updateOverwrite(kayitsiz, {
      CONNECT: false,
    });
    await seslikanal2.updateOverwrite(kayitsiz, {
      CONNECT: false,
    });
    await seslikanal3.updateOverwrite(kayitsiz, {
      CONNECT: false,
    });
    await seslikanal4.updateOverwrite(kayitsiz, {
      CONNECT: false,
    });
    await seslikanal5.updateOverwrite(kayitsiz, {
      CONNECT: false,
    });

    if (!tumMsg) {
      return;
    } else {
      await message.channel.bulkDelete(tumMsg, true);
      await message.reply(kapandi).then((msg) => msg.delete({ timeout: 3500 }));
    }
  } else {
    return message
      .reply(zatenKapali)
      .then((msg) => msg.delete({ timeout: 3500 }));
  }
};

exports.conf = {
  aliases: [
    "k-kapat",
    "hoşgeldin-kapat",
    "hg-kapat",
    "k-kapa",
    "hg-kapa",
    "hoşgeldin-kapa",
    "k-kapa",
    "hosgeldin-kapa",
    "hosgeldin-kapat",
    "kayıt-kapa",
    "kayit-kapat",
    "kayit-kapa",
  ],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "kayıt-kapat",
};
