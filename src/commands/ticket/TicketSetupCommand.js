const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManger = require('../../utils/StateManger');

module.exports = class Ticket1Command extends BaseCommand {
  constructor() {
    super('setupticket', 'ticket', []);
    this.connection = StateManger.connection;
  }

  run(client, message, args, prefix) {
    (async() => { 
      const Discord = require("discord.js");
      if(message.author.bot || message.channel.type === "dm") return;
      if(message.guild.ownerID === message.author.id) {

        // ticket-setup #channel
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Usage: `" +prefix+"setupticket #channel`");

        try{
          await this.connection.query(
              `UPDATE GuildConfigurable SET ticketChannelId = '${channel.id}' WHERE guildId = '${message.guild.id}' `
          );

          //embed
          let sent = await channel.send(new Discord.MessageEmbed()
          .setTitle("Ticket System")
          .setDescription("React to open a ticket!")
          .setFooter("Ticket System")
          .setColor("00ff00")
          );

          await this.connection.query(
            `UPDATE GuildConfigurable SET ticketMessageId = '${sent.id}' WHERE guildId = '${message.guild.id}' `
          );
          StateManger.emit('ticketChannelUpdate', message.guild.id, channel.id);
          StateManger.emit('ticketMessageUpdate', message.guild.id, sent.id);

          sent.react('🎫');
          message.channel.send("Ticket System Setup Done!").then(msg => msg.delete({timeout: 3000}));
      } catch(err){
          console.log(err);
          message.channel.send(`Ticket System Setup failed`).then(msg => msg.delete({timeout: 3000}));
      }

    }else {
        return;
    }
    })();
  }
}