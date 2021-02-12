const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManger = require('../../utils/StateManger');
//prefix
const guildCommandPrefixes = new Map();
//welcome message
const guildWelcomeChannel = new Map();
const guildWelcomeEmbedOrCanvas = new Map();
//verify
const guildVerifyChannel = new Map();
const guildVerifyMessage = new Map();
const guildVerifyRole = new Map();
//tickets
const guildTicketChannel = new Map();
const guildTicketMessage = new Map();

var colors = require('colors');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
    this.connection = StateManger.connection;
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity(`with ${client.guilds.cache.size} servers`); 

    client.guilds.cache.forEach(guild => {
        this.connection.query(
            `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const prefix = result[0][0].cmdPrefix; 
            guildCommandPrefixes.set(guildId, prefix);
            StateManger.emit('prefixFetched', guildId, prefix)
            console.log(`SERVER NAME:`.gray + ` ${guild}` + ` ID:`.gray + `(${guild.id})` + `-data found`.green)
        }).catch(err => console.log(`SERVER NAME:`.gray + ` ${guild}` + ` ID:`.gray + `(${guild.id})` + `-data not found`.red));
        
    }); 
    //welcome message channel
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT welcomeChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const welcomeChannelId = result[0][0].welcomeChannelId; 
          guildWelcomeChannel.set(guildId, welcomeChannelId);
          StateManger.emit('welcomeChannelFetched', guildId, welcomeChannelId)
      }).catch(err => err);
      
    });
    //welcome embed or canvas
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT welcomeEmbedOrCanvas FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const welcomeEmbedOrCanvas = result[0][0].welcomeEmbedOrCanvas; 
          guildWelcomeEmbedOrCanvas.set(guildId, welcomeEmbedOrCanvas);
          StateManger.emit('welcomeEmbedOrCanvasFetched', guildId, welcomeEmbedOrCanvas)
      }).catch(err => err);
      
    });

    //verify channel
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT verifyChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const verifyChannelId = result[0][0].verifyChannelId; 
          guildVerifyChannel.set(guildId, verifyChannelId);
          StateManger.emit('verifyChannelFetched', guildId, verifyChannelId)
      }).catch(err => err);
      
    });
    //verify message id
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT verifyMessageId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const verifyMessageId = result[0][0].verifyMessageId; 
          guildVerifyMessage.set(guildId, verifyMessageId);
          StateManger.emit('verifyMessageFetched', guildId, verifyMessageId)
      }).catch(err => err);
      
    });
    //verify role
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT verifyRole FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const verifyRole = result[0][0].verifyRole; 
          guildVerifyRole.set(guildId, verifyRole);
          StateManger.emit('verifyRoleFetched', guildId, verifyRole)
      }).catch(err => err);
      
    });
    //ticket channel
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT ticketChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const ticketChannelId = result[0][0].ticketChannelId; 
          guildTicketChannel.set(guildId, ticketChannelId);
          StateManger.emit('ticketChannelFetched', guildId, ticketChannelId)
      }).catch(err => err);
      
    });
    //verify message id
    client.guilds.cache.forEach(guild => {
      this.connection.query(
          `SELECT ticketMessageId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
          const guildId = guild.id;
          const ticketMessageId = result[0][0].ticketMessageId; 
          guildTicketMessage.set(guildId, ticketMessageId);
          StateManger.emit('ticketMessageFetched', guildId, ticketMessageId)
      }).catch(err => err);
      
    });

    //invite link "ADMINISTRATOR"
    try {
      //Generates a invite link in the console...
      let link = await client.generateInvite(["ADMINISTRATOR"]);
      console.log(link);

    } catch(e) {  
      console.log(e.stack);

    }
  }
}