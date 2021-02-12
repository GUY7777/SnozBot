const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'say`**/**`say embed [something]', ['s']);
  }

  run(client, message, args) {
    const Discord = require("discord.js");

    let messageArray = message.content.split(" ");
    let args2 = messageArray.slice(1);

    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(message.deletable) message.delete();

    if(args2.length < 1)
      return;
    

    if(args2[0].toLowerCase() === "e" || args2[0].toLowerCase() === "embed"){
      const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(args2.slice(1).join(" "))
        .setTimestamp()
        .setFooter(`${message.member.user.username} message`, message.member.user.displayAvatarURL())
      return message.channel.send(embed)
    }
    else{
      message.channel.send(args2.join(" "));  }
}}