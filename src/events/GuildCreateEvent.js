// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../utils/structures/BaseEvent');
const StateManger = require('../utils/StateManger');

//prefix
const guildCommandPrefixes = new Map();
// welcome message
const guildWelcomeChannel = new Map();
const guildWelcomeEmbedOrCanvas = new Map();
// verify
const guildVerifyChannel = new Map();
const guildVerifyMessage = new Map();
const guildVerifyRole = new Map();

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
    this.connection = StateManger.connection;
  }
  
  async run(client, guild) {
    client.user.setActivity(`with ${client.guilds.cache.size} servers`);
    try{
      await this.connection.query(
          `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
      );
      await this.connection.query(
          `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
      )
      console.log(`Added to db`)

        ///////////////////
        //  Update Data  //
        ///////////////////

        //prefix
        this.connection.query(
            `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const prefix = result[0][0].cmdPrefix; 
            guildCommandPrefixes.set(guildId, prefix);
            StateManger.emit('prefixUpdate', guildId, prefix)
        }).catch(err => console.log());   

        //welcome message channel
        this.connection.query(
            `SELECT welcomeChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const welcomeChannelId = result[0][0].welcomeChannelId; 
            guildWelcomeChannel.set(guildId, welcomeChannelId);
            StateManger.emit('welcomeChannelUpdate', guildId, welcomeChannelId)
        }).catch(err => console.log()); 

        //welcome embed or canvas
        this.connection.query(
            `SELECT welcomeEmbedOrCanvas FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const welcomeEmbedOrCanvas = result[0][0].welcomeEmbedOrCanvas; 
            guildWelcomeEmbedOrCanvas.set(guildId, welcomeEmbedOrCanvas);
            StateManger.emit('welcomeEmbedOrCanvasFetched', guildId, welcomeEmbedOrCanvas)
        }).catch(err => console.log()); 

        //verify channel
        this.connection.query(
            `SELECT verifyChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const verifyChannelId = result[0][0].verifyChannelId; 
            guildVerifyChannel.set(guildId, verifyChannelId);
            StateManger.emit('verifyChannelFetched', guildId, verifyChannelId)
        }).catch(err => console.log()); 

        //verify message id
        this.connection.query(
            `SELECT verifyMessageId FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const verifyMessageId = result[0][0].verifyMessageId; 
            guildVerifyMessage.set(guildId, verifyMessageId);
            StateManger.emit('verifyMessageFetched', guildId, verifyMessageId)
        }).catch(err => console.log());

        //verify role
        this.connection.query(
            `SELECT verifyRole FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            const guildId = guild.id;
            const verifyRole = result[0][0].verifyRole; 
            guildVerifyRole.set(guildId, verifyRole);
            StateManger.emit('verifyRoleFetched', guildId, verifyRole)
        }).catch(err => console.log());


  } catch(err) {
      console.log(err);
  }    
  }
}