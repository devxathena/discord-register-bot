const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Canvas = require("canvas");
require("moment-duration-format");
const Discord = require("discord.js");
moment.locale("tr");
const kurallar = process.env.RULES_CHANNEL;

module.exports = async (fs, client, Client, Intents, Discord) => {
  const beklemeRol = process.env.WAIT_MODE_ROLE;

  const wave =
    client.emojis.cache.find((emoji) => emoji.name === "wave") || "👋";

  const welcome = process.env.WELCOME_CHANNEL; //gelenler
  const guildID = process.env.GUILD_ID;
  const register = process.env.REGISTER_CHANNEL; //KAYIT
  const staff = process.env.STAFF_ROLE; //kayıt yetkilisi
  const welcome_log = process.env.WELCOME_LOG_CHANNEL; //giriş-çıkış-log
  const join_role = process.env.FIRST_JOIN_ROLE; //biletsiz alt rol
  const rules_channel = process.env.RULES_CHANNEL; //kurallar

  client.on("guildMemberAdd", async (member) => {

    const welcomeJPG = process.env.WELCOME_JPG;

    const canvas = Canvas.createCanvas(960, 540);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(welcomeJPG);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const text = "Sunucuya Katıldı!";

    // Border
    //  ctx.strokeStyle = "#f0f0f0";
    //  ctx.strokeRect(0, 0, canvas.width, canvas.height);

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
      const botRole = process.env.BOT_ROLE;
      member.roles.add(`${botRole}`);
      const botGirdiLog = new MessageEmbed()
        .setTitle("Sunucuya bir bot girdi!")
        .setAuthor(
          member.user.tag,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("GREEN")
        .setDescription(
          `Üye: <@${member.id}>\nÜye sayısı: ${member.guild.memberCount}\nHesap Oluşturma Tarihi: ` +
            moment(member.user.createdAt).format("DD MMMM YYYY hh:mm") +
            `\nKatıldığı Tarih: ` +
            moment(member.joinedAt).format("DD MMMM YYYY hh:mm")
        )
        .setThumbnail(member.user.avatarURL({ dynamic: true, size: 1024 }))
        .setFooter(
          "ID: " + `${member.user.id}`,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setTimestamp();
      member.guild.channels.cache.get(welcome_log).send(botGirdiLog);
    } else {

      let uye = client.users.cache.get(member.id);

      const kurulus = new Date().getTime() - uye.createdAt.getTime();

      var kontrol;
      if (kurulus < 1296000000) {
        member.roles.add(beklemeRol);
        kontrol = `Hesap Durumu: **Güvenilir Değil!** ${process.env.DECLINED_EMOJI_ID}`;
      }
      if (kurulus > 1296000000) {
      member.roles.add(join_role)
        kontrol = `Hesap Durumu: **Güvenilir!** ${process.env.APPROVED_EMOJI_ID}`;}
      const kuruluss = new Date().getTime() - uye.createdAt.getTime();
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`);
      const embedRegisterChannel = new MessageEmbed()
        .setAuthor(`Yeni Bir Üye Katıldı, 👋 ${member.user.username}!`, member.user.avatarURL({dynamic: true, size: 1024}))
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setDescription(
          `📥 • Sunucumuza hoş geldin <@${uye.id}>,
    
               • Seninle beraber  ` +member.guild.memberCount +` kişi olduk!.
    
     • Hesabın \`` +
            gecen +
            `\` önce oluşturulmuş (` +
            moment(member.user.createdAt).format("DD MMMM YYYY hh:mm") +
            `).
    
             • ` +
            kontrol +
            `
    
    👀 • <#${rules_channel}> kanalını gözden geçirmeni tavsiye ederim.
  
    🚨 • <@&${staff}> seninle ilgilenecektir.
    
  `
        )
        .setColor("RANDOM");
      await member.setNickname(`Kayıtsız ${member.user.username}`);

      const uyeDM = new MessageEmbed()
        .setTitle(` ${wave}  Sunucuya Hoşgeldin!  ${wave}`)
        .setDescription(
          `
            Merhaba ${member.user.username} ,
            
            ${member.guild.name} sohbet odaklı, etkinliklerin düzenlendiği, oyunlar oynandığı bir discord sunucusudur. 
             
            <#${kurallar}> kanalındaki kuralları okuduktan sonra altındaki emojiye basarak sesli kayıt aşamasına geçebilirsiniz.
            
            Tekrardan ${member.guild.name}'e hoşgeldin!
                          `
        )
        .setFooter(
          member.guild.name + ` `,
          member.guild.iconURL({ dynamic: true, size: 1024 })
        )
        .setThumbnail(member.guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor("AQUA")
        .setTimestamp();

      try {
        member.send(uyeDM);
        
      } catch (e) {
        console.log(`${member.guild.name} sunucusuna girmeye calisan ${member.user.username}'in DM'i kapali oldugundan onun ozeline sunucuya giris mesajini gonderemedim.`)
      }

      member.guild.channels.cache.get(welcome).send(attachment);
      member.guild.channels.cache
        .get(register)
        .send(`<@&${staff}>`, embedRegisterChannel);

      const uyeGirdiLog = new MessageEmbed()
        .setTitle("Sunucuya bir üye girdi!")
        .setAuthor(
          member.user.tag,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("GREEN")
        .setDescription(
          `Üye: <@${member.id}>\nÜye sayısı: ${member.guild.memberCount}\nHesap Oluşturma Tarihi: ` +
            moment(member.user.createdAt).format("DD MMMM YYYY hh:mm") +
            `\nKatıldığı Tarih: ` +
            moment(member.joinedAt).format("DD MMMM YYYY hh:mm") +
            `\n` +
            kontrol
        )
        .setThumbnail(member.user.avatarURL({ dynamic: true, size: 1024 }))
        .setFooter(
          "ID: " + `${member.user.id}`,
          member.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .setTimestamp();
      member.guild.channels.cache.get(welcome_log).send(uyeGirdiLog);
    }
  });
};
