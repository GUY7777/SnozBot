// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const StateManger = require('../utils/StateManger');
const guildTicketChannel = new Map();
const guildTicketMessage = new Map();

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    const Discord = require("discord.js");
    // If a message gains a reaction and it is uncached, fetch and cache the message.
    // You should account for any errors while fetching, it could return API errors if the resource is missing.
    if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return; // If the user was a bot, return.


    const channelId = `${guildTicketChannel.get(reaction.message.guild.id)}`;
    if(channelId === `null`) return;   
    const channel = reaction.message.guild.channels.cache.get(channelId);

    const messageId = `${guildTicketMessage.get(reaction.message.guild.id)}`;
    if(messageId === `null`) return;  

    reaction.message.client.channels.fetch(`${channelId}`).then(channel => {
      channel.messages.fetch(`${messageId}`).then(async reactMessage => {
        if(reaction.message === reactMessage) {
          if(!channel) return;
          if(!reaction.message.id === messageId) return
          if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
          
          if (reaction.message.channel.id === channelId) { // This is a #self-roles channel.
            if (reaction.emoji.name === "🎫") {
                reaction.users.remove(user);
                reaction.message.guild.channels.create(`ticket-${user.username}`, {
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: reaction.message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text'
                }).then(async channel => {
                    channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly. !closeticket for closing the ticket").setColor("00ff00"))
                })
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
StateManger.on('ticketChannelFetched', (guildId, ticketChannelId) => {
  guildTicketChannel.set(guildId, ticketChannelId);
});

StateManger.on('ticketChannelUpdate', (guildId, ticketChannelId) => {
  guildTicketChannel.set(guildId, ticketChannelId);
});


//// verify message
StateManger.on('ticketMessageFetched', (guildId, ticketMessageId) => {
  guildTicketMessage.set(guildId, ticketMessageId);
});

StateManger.on('ticketMessageUpdate', (guildId, ticketMessageId) => {
  guildTicketMessage.set(guildId, ticketMessageId);
});