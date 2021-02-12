// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
const BaseEvent = require('../utils/structures/BaseEvent');
const StateManger = require('../utils/StateManger');
var colors = require('colors');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
    this.connection = StateManger.connection;
  }
  
  async run(client, guild) {
    client.user.setActivity(`with ${client.guilds.cache.size} servers`);   
    try{
      await this.connection.query(
          `DELETE FROM Guilds WHERE guildId = '${guild.id}'`
      );
      await this.connection.query(
          `DELETE FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      )
      console.log(`SERVER NAME:`.gray + ` ${guild}` + ` ID:`.gray + `(${guild.id})` + `-data removed`.yellow)
  } catch(err) {
      console.log(err);
  }  
  }
}