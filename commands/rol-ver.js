const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
  message.delete();
  let userToModify =
    message.mentions.members.first() || guild.members.cache.get(`${args[1]}`);
  let roleToAdd = message.mentions.roles.first();
  const rolID = message.mentions.roles.first().id;
  const log = process.env.LOG_CHANNEL;
  const rolAlan = message.author.id;

  const uyeYok = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setDescription(`❌ | Rol alınacak kişi bulunamadı!`)
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("RED");

  const rolbellidegil = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setDescription(`❌ | Rol belirtilmemiş, lütfen etiketleyerek belirtin.`)
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("RED");

  if (!userToModify)
    return message.reply(uyeYok).then((msg) => msg.delete({ timeout: 3500 }));
  if (!roleToAdd)
    return message
      .reply(rolbellidegil)
      .then((msg) => msg.delete({ timeout: 4500 }));

  if (userToModify.roles.cache.get(`${rolID}`)) {
    const rolVar = new MessageEmbed()
      .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
      .setDescription(
        `❌ | <@${userToModify.user.id}>'in üzerinde <@&${roleToAdd.id}> rolü zaten var!`
      )
      .setFooter(
        `© ` + process.env.BOT_NAME + ` Kayıt `,
        guild.iconURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor("RED");
    message.reply(rolVar).then((msg) => msg.delete({ timeout: 3500 }));
  } else {
    message.mentions.roles.each((r) => {
      const rolVer = new MessageEmbed()
        .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
        .setDescription(
          `✅ | <@${userToModify.user.id}>'in üzerine <@&${roleToAdd.id}> rolü verdim!`
        )
        .setFooter(
          `© ` + process.env.BOT_NAME + ` Kayıt `,
          guild.iconURL({ dynamic: true, size: 1024 })
        )
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp()
        .setColor("GREEN");

      userToModify.roles.add(r);
      message.reply(rolVer).then((msg) => msg.delete({ timeout: 3500 }));

      const logembed = new MessageEmbed()
        .setTitle(process.env.BOT_NAME + " Kayıt LOG Sistemi")
        .addField(
          `Rol Verildi`,
          `\n**Rol Verilen :** <@${userToModify.user.id}>\n\n**Rolü Veren :** <@${rolAlan}>\n\n**Verilen Rol :** <@&${r.id}>\n`
        )
        .setFooter(
          `© ` + process.env.BOT_NAME + ` Kayıt `,
          guild.iconURL({ dynamic: true, size: 1024 })
        )
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor("AQUA")
        .setTimestamp();

      client.channels.cache.get(`${log}`).send(logembed);
    });
    // await userToModify.roles.add(roleToAdd).catch(err => console.log(" Bir hata var: "+ err))
  }
};
exports.conf = {
  aliases: ["r-ver", "rv", "r-v"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "rol-ver",
};