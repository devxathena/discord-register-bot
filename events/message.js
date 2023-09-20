module.exports = (client, prefix) => {
  client.on("message", async (message) => {
    if (message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    let client = message.client;
    if (message.author.bot) return;
    const channel = message.channel;
    if (!channel) return;
    const guild = message.guild;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0].slice(prefix.length);
    let params = message.content.split(" ").slice(1);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (!message.member.permissions.has(cmd.permission)) return;
      cmd.run(client, message, channel, guild, args, params);
    }
  });
};
