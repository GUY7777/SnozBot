const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManger = require('../../utils/StateManger');

module.exports = class SetVerifyCommand extends BaseCommand {
  constructor() {
    super('setverify', 'setverify [message-id] @role', ['setrules']);
    this.connection = StateManger.connection;
  }

  async run(client, message, args, prefix) {
    if(message.member.id === message.guild.ownerID) {
      let newVerifyChannel = message.channel;
      if(!newVerifyChannel) return message.reply("Usage: `" +prefix+"setverify message-id @role`");
      if(newVerifyChannel){
        try{
          const messageId = `${args[0]}`;
          const RoleMentions = message.mentions.roles.first();
          if(!RoleMentions) return message.reply("Usage: `" +prefix+"setverify message-id @role`");
          if (!Number(messageId)) return message.channel.send('Failed to find the message! Setting value to error message...');

          if(!messageId) return
          try {
            await Promise.all([newVerifyChannel.messages.fetch(messageId)]);
           } catch (error) {
            // Error: Message not found
            if (error.code === 10008) {
                console.error('Failed to find the message! Setting value to error message...');
                return message.channel.send('Failed to find the message! Setting value to error message...');
            }}
            // Check if the Message with the targeted ID is found from the Discord.js API
              let newVerifyChannelId = newVerifyChannel.id;
                await this.connection.query(
                    `UPDATE GuildConfigurable SET verifyChannelId = '${newVerifyChannelId}' WHERE guildId = '${message.guild.id}' `
                );
                await this.connection.query(
                    `UPDATE GuildConfigurable SET verifyMessageId = '${messageId}' WHERE guildId = '${message.guild.id}'`
                );
                await this.connection.query(
                  `UPDATE GuildConfigurable SET verifyRole = '${RoleMentions.id}' WHERE guildId = '${message.guild.id}'`
                );
                message.channel.send(`Updated verify channel to ${newVerifyChannel}, **${messageId}** verify message, ${RoleMentions} role`);
                StateManger.emit('verifyChannelUpdate', message.guild.id, newVerifyChannelId);
                StateManger.emit('verifyMessageUpdate', message.guild.id, messageId);
                StateManger.emit('verifyRoleUpdate', message.guild.id, RoleMentions.id);

                message.client.channels.fetch(`${newVerifyChannelId}`).then(channel => {
                  channel.messages.fetch(`${messageId}`).then(message => {
                      message.react("✅");
                  }
                )})
              
            } catch(err){
                console.log(err);
                message.channel.send("Failed to update verify channel to "+newVerifyChannel+", Usage: `" +prefix+"setverify message-id @role`");
            }
      } else{
          message.channel.send('Incorrect amount of arguments');
      }
  } else{
      message.channel.send('You do not have premission to use that command');
  }  }
}
