const {VoiceChannel, GuildMember} = require("discord.js");
module.exports = async (
    client,
    authors,
    token,
    staffSound,
    welcomeSound,
    closedSound,
    staffRole
) => {
    client.login(token).catch((err) => {
        console.error(" ❌ | Token geçerli değil! " + err);
        return client.destroy();
    });

    client.on("warn", (e) => console.warn(" ❌ | WARN! : " + e));

    client.on("error", (e) => console.error(" ❌ | ERR! : " + e));

    client.on("shardError", (e) => {
        console.error(" ❌ | shardError! : " + e);
    });

    VoiceChannel.prototype.hasStaff = function (checkMember = false) {
        if (
            this.members.some(
                (m) =>
                    (checkMember !== false ? m.user.id !== checkMember.id : true) &&
                    !m.user.bot &&
                    m.roles.highest.position >=
                    m.guild.roles.cache.get(staffRole).position
            )
        )
            return true;
        return false;
    };

    VoiceChannel.prototype.getStaffs = function (checkMember = false) {
        return this.members.filter(
            (m) =>
                (checkMember !== false ? m.user.id !== checkMember.id : true) &&
                !m.user.bot &&
                m.roles.highest.position >= m.guild.roles.cache.get(staffRole).position
        ).size;
    };

    GuildMember.prototype.isStaff = function () {
        if (
            !this.user.bot &&
            ([...authors].includes(this.id) ||
                this.hasPermission("BAN_MEMBERS") ||
                this.roles.highest.position >=
                this.guild.roles.cache.get(staffRole).position)
        )
            return true;
        return false;
    };
};
