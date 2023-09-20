const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
  message.delete();
  const log = process.env.LOG_CHANNEL;
  const rolAlan = message.author.id;
  let userToModify =
    message.mentions.members.first() || guild.members.cache.get(`${args[1]}`);
  let roleToAdd = message.mentions.roles.first();
  const rolID = message.mentions.roles.first().id;

  const uyeYok = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setDescription(`❌ | Rol verilecek kişi bulunamadı!`)
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

  if (!userToModify.roles.cache.get(`${rolID}`)) {
    const rolYok = new MessageEmbed()
      .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
      .setDescription(
        `❌ | <@${userToModify.user.id}>'in üzerinde <@&${roleToAdd.id}> rolü zaten yok!`
      )
      .setFooter(
        `© ` + process.env.BOT_NAME + ` Kayıt `,
        guild.iconURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor("RED");
    message.reply(rolYok).then((msg) => msg.delete({ timeout: 3500 }));
  } else {
    //await userToModify.roles.remove(roleToAdd).catch(err => console.log("Bir hata var: "+ err))

    message.mentions.roles.each((r) => {
      const rolAl = new MessageEmbed()
        .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
        .setDescription(
          `✅ | <@${userToModify.user.id}>'in üzerindeki <@&${r.id}> rolü alındı!`
        )
        .setFooter(
          `© ` + process.env.BOT_NAME + ` Kayıt `,
          guild.iconURL({ dynamic: true, size: 1024 })
        )
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp()
        .setColor("GREEN");

      userToModify.roles.remove(r);
      message.reply(rolAl).then((msg) => msg.delete({ timeout: 3500 }));

      const logembed = new MessageEmbed()
        .setTitle(process.env.BOT_NAME + " Kayıt LOG Sistemi")
        .addField(
          `Rol Alındı`,
          `\n**Rolü Alınan :** <@${userToModify.user.id}>\n\n**Rolü Alan :** <@${rolAlan}>\n\n**Alınan Rol :** <@&${r.id}>\n`
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
  }
};
exports.conf = {
  aliases: ["r-al", "r-a", "ra"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "rol-al",
};
