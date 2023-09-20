const { MessageEmbed } = require("discord.js");
const rules_ch = process.env.RULES_CHANNEL;
const kayitcagir = process.env.REGISTER_WRITE;
const kayit_sesli = process.env.VOICE_CHANNEL;
module.exports.run = async (client, message, channel, guild, args, params) => {
  message.delete();
  const wave =
    client.emojis.cache.find((emoji) => emoji.name === "wave") || "👋";

  const kayitmesaji = new MessageEmbed()
    .setDescription(
      `- Kayıt olmadan önce <#${rules_ch}> kanalını gözden geçirmeniz **tavsiye edilir**.
            
            - Kayıtlar aktif olduğu zaman <#${kayitcagir}> kanalına yazı yazma izniniz aktifleştirilir ve kayıtlara bakılır.

            - Eğer <#${kayitcagir}> kanalında yazı yazma izniniz bulunmuyor ise kayıtlar **kapalıdır**.

            - Kayıt sesli kanallarına yetkilileri çağırmak için <#${kayitcagir}>  kanalına **s.kayıt-çağır** yazmanız yeterlidir. (Komut sadece siz kayıt sesli kanallarındaysanız çalışır.)

            - Kayıtlar istisnalar dışında **akşam vakitleri** yapılmaktadır.

            - Kayıt için <#${kayit_sesli}> veya diğer kayıt ses kanallarından birine geçilir.

            - Ses kanallarına girilemiyor ise kayıtlar **kapalıdır**.

            - Tekrardan Sunucuya Hoşgeldiniz! \n`
    )
    .setTitle(` ${wave}  Sunucuya Hoşgeldiniz!  ${wave}`)
    .setFooter(
      `© ` + process.env.BOT_NAME + ` Kayıt `,
      guild.iconURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor("GREEN");
  await message.reply(kayitmesaji).then((msg) => msg.pin());
  const sonmesaj = await message.channel.messages.fetch({ limit: 1 });
  await channel.bulkDelete(sonmesaj, true);
};
exports.conf = {
  aliases: ["k-m-a", "kma", "kayit-mesaj-ayarla", "kayit-kur"],
};
exports.permission = ["ADMINISTRATOR"];
exports.help = {
  name: "kayıt-mesaj-ayarla",
};
