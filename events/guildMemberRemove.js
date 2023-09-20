const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Canvas = require("canvas");
moment.locale("tr");

module.exports = async (fs, client, Client, Intents, Discord) => {
  const welcome = process.env.WELCOME_CHANNEL; //gelenler
  const welcome_log = process.env.WELCOME_LOG_CHANNEL; //giriş-çıkış log

  client.on("guildMemberRemove", async (member) => {
    const welcomeJPG = process.env.WELCOME_JPG;

    const canvas = Canvas.createCanvas(960, 540);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(welcomeJPG);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const text = "Sunucudan Ayrıldı!";

    // Border
    //   ctx.strokeStyle = "#f0f0f0";
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = "bold 45px Arial"; //Yazı Fontu
    ctx.fillStyle = "#f0f0f0"; //Yazı Rengi
    ctx.fillText(
      text,
      canvas.width / 2 - ctx.measureText(text).width / 2,
      canvas.height / 1.23
    ); //1.325

    // UserName
    ctx.font = "bold 50px Arial"; //Yazı Fontu
    ctx.fillStyle = "#f0f0f0"; //Yazı Rengi
    ctx.fillText(
      member.user.username,
      canvas.width / 2 - ctx.measureText(member.user.username).width / 2,
      canvas.width / 1.9
    ); //2.1

    // Crop Avatar
    ctx.beginPath();
    ctx.arc(480, 210, 160, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Avatar
    const avatar = await Canvas.loadImage(
      member.user.avatarURL({ format: "png", size: 1024 })
    );
    ctx.drawImage(avatar, 320, 50, 320, 320);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome.png"
    );

    if (member.user.bot === true) {
      const botCiktiLog = new MessageEmbed()
        .setTitle("BOT Çıktı.")
        .setAuthor(
          member.user.tag,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("RED")
        .setDescription(`Üye Sayısı: ` + member.guild.memberCount)
        .setThumbnail(member.user.avatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();

      member.guild.channels.cache.get(welcome_log).send(botCiktiLog);
    } else {
      member.guild.channels.cache.get(welcome).send(attachment);

      const uyeCiktiLog = new MessageEmbed()
        .setTitle("Üye Ayrıldı.")
        .setAuthor(
          member.user.tag,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("RED")
        .setDescription(
          `Üye sayısı: ${member.guild.memberCount}\nHesap Oluşturma Tarihi: ` +
            moment(member.user.createdAt).format("DD MMMM YYYY hh:mm")
        )
        .setThumbnail(member.user.avatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();

      member.guild.channels.cache.get(welcome_log).send(uyeCiktiLog);
    }
  });
};
