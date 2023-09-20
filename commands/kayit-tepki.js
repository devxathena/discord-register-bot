const {MessageEmbed} = require("discord.js");

module.exports.run = async (client, message, channel, guild, args, params) => {
    const wave =
        client.emojis.cache.find((emoji) => emoji.id === process.env.APPROVED_EMOJI_ID) || "☑";

    const embed = new MessageEmbed()
        .setTitle("📃  " + message.guild.name + " Sunucu Kuralları  📃")
        .setDescription(
            `**`+ message.guild.name +` Discord Sunucusuna Hoşgeldin!**

        Sunucuya girdiğiniz andan itibaren, aşağıdaki kurallara uymak **zorundasınız**, aksi taktirde sunucudan **uzaklaştırılacaksınız**.

        *Bu nedenle aşağıdaki listeli kuralları okuyup anladığınıza emin olun:*

        - Sohbet kanallarında küfür serbesttir yalnızca diğer üyeleri rencide edici söylemler içerisinde bulunmak, yani şahıslara özel hakaretler, din, dil, ırk veya cinsiyet ayrımı içeren söylemlerde bulunmak ya da özel mesaj yoluyla taciz etmek yasaktır.

        - Diğer üyeleri kışkırtabilecek, tartışma çıkarabilecek konular hakkında konuşmak ve tartışma yaratabilecek sert bir dil kullanmak yasaktır.

        - Kişilerin özel bilgilerini paylaşmak yasaktır.

        - Kişisel sorunlarınızı genel sohbete taşımak ve devam ettirmek yasaktır.

        - Sunucu sorumlularından herhangi bir yetki, ayrıcalık ve benzeri isteklerde bulunmak yasaktır.

        - Sunucu içinde veya özel mesaj yolu ile reklam, tanıtım yapmak ve rahatsızlık vermek yasaktır.

        - Eğer bir sosyal sorumluluk, farkındalık, eğitim, etkinlik vb. işlere destek için sunucu yetkililere bildirilip yetkili ve topluluk kuralları dahilinde yapılacaktır.

        - Kelimeleri veya cümleleri, tamamını büyük harflerden oluşacak şekilde yazmak yasaktır.

        - Kurallarımıza uyulmaması halinde yetkililere şikayette bulunun, tartışma yoluyla sorunlarınızı çözmeye çalışmayın. Müsamaha gösterilmeyecektir.`
        )
        .setColor("PURPLE")
        .setFooter(
            "Aşağıdaki emojiye basarak kuralları okuduğunuzu kabul edersiniz.",
            guild.iconURL({dynamic: true, size: 1024})
        )
        .setThumbnail(guild.iconURL({dynamic: true, size: 1024}));
    return message.reply(embed).then((msg) => msg.react(`${wave}`));
};
exports.conf = {
    aliases: ["kt", "k-t", "kayit-tepki", "k-tepki", "kayit-t", "kayıt-t"],
};
exports.permission = ["ADMINISTRATOR"];
exports.help = {
    name: "kayıt-tepki",
};
