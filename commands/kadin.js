const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

function regCount(guildId, authorId) {
  return `totalRegisterCount.${guildId}.${authorId}`;
}

module.exports.regCount = regCount;

module.exports.run = async (client, message, channel, guild, args, params) => {
  message.delete();
  const uye = message.mentions.members.first() || guild.members.cache.get(`${args[1]}`);
  const kayitsizRol = process.env.UNREGISTERED_ROLE;
  const kayitliRol = process.env.MEMBER_ROLE;
  const log = process.env.REGISTER_LOG_CHANNEL;
  const sunucuKayitsizRol = guild.roles.cache.get(`${kayitsizRol}`);
  const sunucuKayitliRol = guild.roles.cache.get(`${kayitliRol}`);
  const kayitYapan = message.author.id;
  const kayit = process.env.REGISTER_CHANNEL_KAYIT;
  const kadinrolu = process.env.KADIN_ROLU;
  const sunucuKadinRol = guild.roles.cache.get(`${kadinrolu}`);
  const karantina = process.env.WAIT_MODE_ROLE;
  const karantinaRol = guild.roles.cache.get(karantina);

  const hataembed = new MessageEmbed()
    .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
    .setDescription(`❌ | Geçersiz kanal!`)
    .setColor("RED")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setTimestamp()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }));

  if (message.channel.id !== kayit)
    return message
      .reply({ embed: hataembed })
      .then((msg) => msg.delete({ timeout: 3750 }));

  if (uye) {
    const uyeKayitliRol = uye.roles.cache.get(`${kayitliRol}`);
    const uyeKayitsizRol = uye.roles.cache.get(`${kayitsizRol}`);
    if (!uye.voice.channel) {
      const sesKanal = new MessageEmbed()
        .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
        .setDescription(
          `❌ | Kayıt gerçekleşemez. <@${uye.id}> ya sesli kanalda değil, ya da onla aynı kanalda değilsin!`
        )
        .setFooter(
          `© ` + process.env.BOT_NAME + ` Kayıt `,
          guild.iconURL({ dynamic: true, size: 1024 })
        )
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor("RED")
        .setTimestamp();

        try {
          uye.roles.remove(karantinaRol)
        } catch(e) {
          console.log("Kişinin üzerinde karantina rolü yok")
        }

      return message
        .reply(sesKanal)
        .then((msg) => msg.delete({ timeout: 5250 }));
    } else {
      if (uyeKayitliRol && !uyeKayitsizRol) {
        const uyeZatenKayitli = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
          .setDescription(`❌ | <@${uye.id}> zaten kayıt olmuş!`)
          .setFooter(
            `© ` + process.env.BOT_NAME + ` Kayıt `,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("RED");

          try {
            uye.roles.remove(karantinaRol)
          } catch(e) {
            console.log("Kişinin üzerinde karantina rolü yok")
          }

        return message
          .reply(uyeZatenKayitli)
          .then((msg) => msg.delete({ timeout: 3500 }));
      } else if (uyeKayitliRol && uyeKayitsizRol) {
        await uye.roles.remove(sunucuKayitsizRol);
        await uye.roles.add(sunucuKadinRol);
        const uyeFazladanKayitliRol = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
          .setDescription(
            `✅ | <@${uye.id}>'nin üstünde fazladan bulunan <@&${kayitsizRol}> rolü alındı!`
          )
          .setFooter(
            `© ` + process.env.BOT_NAME + ` Kayıt `,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");

        message
          .reply(uyeFazladanKayitliRol)
          .then((msg) => msg.delete({ timeout: 3500 }));

        const logUyeFazladanKayitliRol = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt LOG Sistemi")
          .addField(
            `Fazladan Rol Alındı`,
            `**Rolü Alınan :** <@${uye.id}>\n**Rolü Alan :** <@${kayitYapan}>\n**Alınan Rol :** <@&${kayitsizRol}>`
          )
          .setFooter(
            `© ` + process.env.BOT_NAME + ` Kayıt `,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");
        client.channels.cache.get(`${log}`).send(logUyeFazladanKayitliRol);

        try {
          uye.roles.remove(karantinaRol)
        } catch(e) {
          console.log("Kişinin üzerinde karantina rolü yok")
        }

      } else if (!uyeKayitliRol && !uyeKayitsizRol) {
        db.add(regCount(message.guild.id, message.author.id), 1);
        db.add(`kadin.${message.guild.id}.${message.author.id}`, 1);
        db.push(
          `names.${message.guild.id}.${message.author.id}`,
          uye.user.username
        );
        const kayitSayi = db.get(regCount(message.guild.id, message.author.id));
        await uye.roles.add(sunucuKayitliRol);
        await uye.roles.add(sunucuKadinRol);
        await uye.setNickname(null);
        const uyeHicRoluYokKayit = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
          .setDescription(`✅ | <@${uye.id}> başarıyla kayıt edildi!`)
          .setFooter(
            `${message.author.username}'in Kayıt Sayısı: ` + kayitSayi,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");
        message
          .reply(uyeHicRoluYokKayit)
          .then((msg) => msg.delete({ timeout: 3500 }));

        const logUyeHicRoluYokKayit = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt LOG Sistemi")
          .addField(
            `Kayıt Alındı`,
            `**Kayıt Olan :** <@${uye.id}>\n**Kayıt Yapan :** <@${kayitYapan}>\n**Verilen Rol :** <@&${kayitsizRol}>`
          )
          .setFooter(
            `${message.author.username}'in Kayıt Sayısı: ` + kayitSayi,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");

        client.channels.cache.get(`${log}`).send(logUyeHicRoluYokKayit);

        try {
          await uye.roles.remove(karantinaRol)
        } catch(e) {
          console.log("Kişinin üzerinde karantina rolü yok")
        }

      } else if (!uyeKayitliRol && uyeKayitsizRol) {
        db.add(regCount(message.guild.id, message.author.id), 1);
        db.add(`kadin.${message.guild.id}.${message.author.id}`, 1);
        db.push(
          `names.${message.guild.id}.${message.author.id}`,
          uye.user.username
        );
        const kayitSayi = db.get(regCount(message.guild.id, message.author.id));
        await uye.roles.add(sunucuKayitliRol);
        await uye.roles.add(sunucuKadinRol);
        await uye.roles.remove(sunucuKayitsizRol);
        await uye.setNickname(null);
        const uyeKayit = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
          .setDescription(`✅ | <@${uye.id}> başarıyla kayıt edildi!`)
          .setFooter(
            `${message.author.username}'in Kayıt Sayısı: ` + kayitSayi,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");
        message.reply(uyeKayit).then((msg) => msg.delete({ timeout: 3500 }));

        const logUyeKayit = new MessageEmbed()
          .setTitle(process.env.BOT_NAME + " Kayıt LOG Sistemi")
          .addField(
            `Kayıt Alındı`,
            `**Kayıt Olan :** <@${uye.id}>\n**Kayıt Yapan :** <@${kayitYapan}>\n**Verilen Rol :** <@&${kayitsizRol}>`
          )
          .setFooter(
            `${message.author.username}'in Kayıt Sayısı: ` + kayitSayi,
            guild.iconURL({ dynamic: true, size: 1024 })
          )
          .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor("GREEN");

        client.channels.cache.get(`${log}`).send(logUyeKayit);

        try {
          await uye.roles.remove(karantinaRol)
        } catch(e) {
          console.log("Kişinin üzerinde karantina rolü yok")
        }

      }
    }
  } else {
    const hata = new MessageEmbed()
      .setTitle(process.env.BOT_NAME + " Kayıt Sistemi")
      .setDescription(`❌ | Yanlış bilgi girildi!`)
      .setFooter(
        `© ` + process.env.BOT_NAME + ` Kayıt `,
        guild.iconURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor("RED");

    return message.reply(hata).then((msg) => msg.delete({ timeout: 3500 }));
  }
};
exports.conf = {
  aliases: ["k"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "kadın",
};
