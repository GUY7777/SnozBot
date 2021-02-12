// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const StateManger = require('../utils/StateManger');
const guildVerifyChannel = new Map();
const guildVerifyMessage = new Map();
const guildVerifyRole = new Map();

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    // If a message gains a reaction and it is uncached, fetch and cache the message.
    // You should account for any errors while fetching, it could return API errors if the resource is missing.
    if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return; // If the user was a bot, return.

    const channelId = `${guildVerifyChannel.get(reaction.message.guild.id)}`;
    if(channelId === `null`) return;   
    const channel = reaction.message.guild.channels.cache.get(channelId);

    const messageId = `${guildVerifyMessage.get(reaction.message.guild.id)}`;
    if(messageId === `null`) return;  

    const roleId = `${guildVerifyRole.get(reaction.message.guild.id)}`;
    if(roleId === `null`) return;  
    
    reaction.message.client.channels.fetch(`${channelId}`).then(channel => {
      channel.messages.fetch(`${messageId}`).then(async reactMessage => {
        if(reaction.message === reactMessage) {
          if(!channel) return;
          if(!reaction.message.id === messageId) return
          if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
          
          if (reaction.message.channel.id === channelId) { // This is a #self-roles channel.
            if (reaction.emoji.name === "✅") {
              reaction.users.remove(user);
              await reaction.message.guild.members.cache.get(user.id).roles.add(roleId)
              //return user.send("✅ Your account has been verified ✅").catch(() => console.log("Failed to send DM."));
              const Discord = require("discord.js");
              const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Welcome to ${reaction.message.guild}\n\n ✅ Your account has been verified ✅`)
              return user.send(embed).catch(() => console.log("Failed to send DM."));
            }
          } else {
            return; // If the channel was not a #self-roles, ignore them.
          }
    }else{return}
    }
  )})
  }
}

//// verify channel
StateManger.on('verifyChannelFetched', (guildId, verifyChannelId) => {
  guildVerifyChannel.set(guildId, verifyChannelId);
});

StateManger.on('verifyChannelUpdate', (guildId, verifyChannelId) => {
  guildVerifyChannel.set(guildId, verifyChannelId);
});


//// verify message
StateManger.on('verifyMessageFetched', (guildId, verifyMessageId) => {
  guildVerifyMessage.set(guildId, verifyMessageId);
});

StateManger.on('verifyMessageUpdate', (guildId, verifyMessageId) => {
  guildVerifyMessage.set(guildId, verifyMessageId);
});

//// verfiy role
StateManger.on('verifyRoleFetched', (guildId, verifyRole) => {
  guildVerifyRole.set(guildId, verifyRole);
});

StateManger.on('verifyRoleUpdate', (guildId, verifyRole) => {
  guildVerifyRole.set(guildId, verifyRole);
});