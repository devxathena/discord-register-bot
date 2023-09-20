const { MessageEmbed, Message } = require("discord.js");

module.exports.run = (client, message, channel, guild) => {
  message.delete();

  const yardim = new MessageEmbed()
    .setTitle(`**`+message.guild.name +` Kayıt Sistemi**`)
    .addFields(
      {
        name: `Aşağıda kayıt sistemine ait tüm komutları görebilirsiniz.`,
        value: `**everyone :** *Sunucuda hiç rolü olmayan (sadece everyone rolü olan) ve oto-rol bugına giren üyelere kayıtsız rolü verir.*
        
        **kayıt :** *Sunucuya yeni katılan üyeleri kayıt etmenizi sağlar. (Kullanıcı seslide yoksa kayıt komutu çalışmaz!)*
        
        **erkek :** *Sunucuya yeni katılan erkek üyeleri kayıt etmenizi sağlar. (Kullanıcı seslide yoksa kayıt komutu çalışmaz!)*

        **kadın :** *Sunucuya yeni katılan kadın üyeleri kayıt etmenizi sağlar. (Kullanıcı seslide yoksa kayıt komutu çalışmaz!)*

        **kayıt-aç :** *Kayıt olmayan üyelerin kayıt çağırma kanalına mesaj atma izinlerini aktive eder ve bot sesini kayıt aktif olarak düzenler.*
        
        **kayıt-kapat :** *Kayıt olmayan üyelerin kayıt çağırma kanalına mesaj atma izinlerini devre dışı bırakır ve bot sesini kayıt kapalı olarak düzenler.*
        
       **kayıt-çağır :** *Üyeler bu komutu girdiğinde kanala kayıt yetkililerini etiketleyen ve onları çağıran bir mesaj yollar.*`,
      },
      {
        name: `‎`,
        value: `**kayıt-sayı :** *Belirtilen kişinin (belirtilmediyse mesajı yollayan kişinin) kayıt sayısını gösterir.*

        **sese-gir :** *Bot kayıt ses kanalından çıkış yaptıysa bu komut kullanıldığında ses kanalına tekrardan giriş yapar.*
        
        **kayıt-mesajı-ayarla :** *Kayıt çağırma kanalına şu anda kayıt alınamayacağına dair bir mesaj yollar.*
                
                **kayıt-tepki :** *Mesaja tepki vererek rol verme olayını gerçekleştirmek için komutun kullanıldığı kanala kurallar mesajını yollar ve bir tepki verir.*
        
        **rol-al :** *Üyenin üstünde bulunan rollerden belirtilen rolü siler.*
        
        **rol-ver :** *Üyeye belirtilen rolü verir.*
        
        **temizle :** *100 adet mesaj siler*`,
      }
    )
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setColor("LUMINOUS_VIVID_PINK")
    .setTimestamp();

  return channel.send(yardim);
};
exports.conf = {
  aliases: ["y", "h", "yardim", "help"],
};
exports.permission = ["KICK_MEMBERS"];
exports.help = {
  name: "yardım",
};
