const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { regCount } = require("./kayit");

module.exports.run = async (client, message, channel, guild, args, params) => {
  const uye = message.mentions.members.first() || client.users.cache.get(args[1]) || message.author;
  const kayitSayi = db.get(regCount(message.guild.id, uye.id)) || "Ulaşılamadı!";
  const kadinSayi = db.get(`kadin.${message.guild.id}.${uye.id}`) || "Ulaşılamadı!";
  const erkekSayi = db.get(`erkek.${message.guild.id}.${uye.id}`) || "Ulaşılamadı!";
  const normalKayitSayi = db.get(`normalkayit.${message.guild.id}.${uye.id}`) || "Ulaşılamadı!";

  let uyeThumbnail = "BOSH";

  if (!uye.avatarURL) {
    uyeThumbnail = uye.user.avatarURL({ dynamic: true, size: 1024 });
  } else {
    uyeThumbnail = uye.avatarURL({ dynamic: true, size: 1024 });
  }


  const embed = new MessageEmbed()
    .setDescription(
      `Aşağıda <@${uye.id}>'nin güncel kayıt verilerine ulaşabilirsiniz:
      
            Total kayıt sayısı: ${kayitSayi} 
            
            Normal üye kayıt sayısı: ${normalKayitSayi}

            Kadın üye kayıt sayısı:  ${kadinSayi}
            
            Erkek üye kayıt sayısı: ${erkekSayi}`
    )
    .setTitle(process.env.BOT_NAME `e Kayıt Sistemi`)
    .setColor("AQUA")
    .setThumbnail(uyeThumbnail)
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setTimestamp();

  const embedHata = new MessageEmbed()
    .setDescription("Kullanıcı bulunamadı, etiketle veya ID'sini gir.")
    .setTitle(process.env.BOT_NAME + ` Kayıt Sistemi`)
    .setColor("RED")
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setTimestamp();

  if (!uye) {
    return message
      .reply(embedHata)
      .then((msg) => msg.delete({ timeout: 5000 }));
  } else {
    return message.reply(embed);
  }
};
exports.conf = {
  aliases: ["ks", "k-s", "k-sayı", "k-sayi", "kayit-s", "kayıt-s"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "kayıt-sayı",
};
