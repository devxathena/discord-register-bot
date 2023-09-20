const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
moment.locale("tr");

module.exports = (client, playVoice, guildID, voiceCH) => {
  const reactionRoleMessageID = process.env.REACTION_ROLE_MESSAGE_ID;
  const rules_ch = process.env.RULES_CHANNEL;

  client.on("ready", async () => {
    function setStatus() {
      client.user.setActivity(process.env.BOT_NAME + "'e Hoşgeldin!", {
        type: "STREAMING",
        url: "https://www.twitch.tv/xathena_",
      });
      setTimeout(() => {
        client.user.setActivity(client.user.username, {
          type: "STREAMING",
          url: "https://www.twitch.tv/xathena_",
        });
      }, 5000);
    }

    setInterval(setStatus, 10000);
    console.log(
      `\n ${client.user.username} şu anda:\n ${client.channels.cache.size} adet kanala,\n ${client.guilds.cache.size} adet sunucuya,\n ${client.users.cache.size} adet kullanıcıya hizmet veriyor.\n`
    );
    console.log(
      ` [${moment().format("DD-MM-YYYY HH:mm:ss")}] BOT: Oyun ismi ayarlandı!`
    );
    console.log(
      ` [${moment().format(
        "DD-MM-YYYY HH:mm:ss"
      )}] BOT: Aktif, Komutlar yüklendi!`
    );
    console.log(
      ` [${moment().format("DD-MM-YYYY HH:mm:ss")}] BOT: ${
        client.user.tag
      } ismi ile giriş yapıldı!`
    );
    console.log(` ------------------------------------------`);

    await client.channels.cache
      .get(rules_ch)
      .messages.fetch(`${reactionRoleMessageID}`);

    const Guild =
      client.guilds.cache.get(guildID) || client.guilds.cache.first();
    if (!Guild) {
      console.error(" ❌ | Sunucu bulunamadı!");
      return client.destroy();
    }

    const Channel = Guild.channels.cache.get(voiceCH);
    if (!Channel) {
      console.error(" ❌ | Kanal bulunamadı!");
      return client.destroy();
    }

    Channel.join()
      .then((connection) => {
        client.voiceConnection = connection;
        client.channelID = Channel.id;
        console.log(" Ses dosyası çalıyor!");
        if (!Channel.hasStaff()) playVoice(client);
        else client.staffJoined = true;
      })
      .catch((err) => {
        console.error(
          ` ❌ | Şu sesli kanala ulaşamadım: (${Channel.name}) (${Channel.id}): ` +
            err.message
        );
        return client.destroy();
      });

    const aktifembed = new MessageEmbed()
      .setTitle(`${client.user.username} aktif!`)
      .setDescription(
        `[Created by XATHENA.\nTüm komutları görmek için s.yardım yazın.](https://github.com/x4th3n4/discord-register-bot)
      
        ${moment().format("DD-MM-YYYY HH:mm:ss")}
      `
      )
      .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
      .setTimestamp()
      .setColor("GREEN")
      .setFooter(`${client.user.username} 2022`, client.user.avatarURL({ dynamic: true, size: 512 }));

    client.channels.cache.get(process.env.READY_CHANNEL_ID).send(aktifembed);
  });
};
