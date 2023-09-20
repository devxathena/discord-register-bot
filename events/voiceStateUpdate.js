const voice_ch = process.env.VOICE_CHANNEL;

module.exports = async (client, playVoice) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        let kanal = client.channels.cache.get(voice_ch)
        if(client.staffJoined){
            let hasStaff = kanal.members.some((member) => {
                if (member.isStaff()){
                    return true;
                }
                return false;
            });
            if(hasStaff) return client.staffJoined = true;
            client.staffJoined = false;
            return playVoice(client);
        }

        if (newState.member.isStaff() && newState.channelID === client.channelID) {
            client.staffJoined = true;
            return playVoice(client);
        }

        if (!newState.member.isStaff() && newState.channelID === client.channelID) {
            client.staffJoined = false;
            return playVoice(client);
        }

        if (oldState.member.isStaff() && oldState.channelID === client.channelID){
            client.staffJoined = false;
        }
    });
};
