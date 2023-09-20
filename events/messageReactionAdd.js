module.exports = async (fs, client, Client, Intents, Discord) => {
  const unregisteredRole = process.env.UNREGISTERED_ROLE;
  const joinRole = process.env.FIRST_JOIN_ROLE;
  const reactionRoleMessageID = process.env.REACTION_ROLE_MESSAGE_ID;

  client.on("messageReactionAdd", async (msgReact, user) => {
    if (msgReact.message.id === reactionRoleMessageID) {
      if (msgReact.emoji.id === process.env.APPROVED_EMOJI_ID) {
        const member = msgReact.message.guild.members.cache.get(user.id);
        member.roles.add(`${unregisteredRole}`);
        await member.roles.remove(`${joinRole}`);
      }
    }
  });
};
