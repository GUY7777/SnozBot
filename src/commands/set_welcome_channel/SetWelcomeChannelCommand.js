const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManger = require('../../utils/StateManger');

module.exports = class SetwelcomechannelCommand extends BaseCommand {
  constructor() {
    super('setwelcomechannel', 'setwelcomechannel #channel embed`**/**`canvas`**/**`embed&canvas', ['setwelcome','setwel']);
    this.connection = StateManger.connection;
  }

  async run(client, message, args, prefix) {
    if(message.member.id === message.guild.ownerID) {
      let newWelcomeChannel = message.mentions.channels.first();
      if(!newWelcomeChannel) return message.reply("Usage: `" +prefix+"setwelcome #channel embed/canvas/embed&canvas`");
      if(newWelcomeChannel){
        try{
          const embedOrCanvas = `${args[1]}`;
            if(!(embedOrCanvas === "embed" || embedOrCanvas === "canvas" || embedOrCanvas === "embed&canvas"))return message.channel.send('Incorrect amount of arguments, Usage: `' +prefix+'setwelcome #channel embed/canvas/embed&canvas`');            
              let welcomeChannelId = newWelcomeChannel.id;
                await this.connection.query(
                    `UPDATE GuildConfigurable SET welcomeChannelId = '${welcomeChannelId}' WHERE guildId = '${message.guild.id}' `
                );
                await this.connection.query(
                    `UPDATE GuildConfigurable SET welcomeEmbedOrCanvas = '${embedOrCanvas}' WHERE guildId = '${message.guild.id}'`
                );
                message.channel.send(`Updated welcome channel to ${newWelcomeChannel}, sending welcome **${embedOrCanvas}**`);
                StateManger.emit('welcomeChannelUpdate', message.guild.id, welcomeChannelId);
                StateManger.emit('welcomeEmbedOrCanvasUpdate', message.guild.id, embedOrCanvas);
            } catch(err){
                console.log(err);
                message.channel.send(`Failed to update welcome channel to ${newWelcomeChannel}`);
            }
      } else{
          message.channel.send('Incorrect amount of arguments');
      }
  } else{
      message.channel.send('You do not have premission to use that command');
  }
}}