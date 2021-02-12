const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super("avatar", "avatar @user", ["icon"]);
  }

  run(client, message, args) {
    const Discord = require("discord.js");

    let user = message.mentions.users.first() || message.author;
    //let avatar = user.avatarURL({size: 2048});
    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

    const embed = new Discord.MessageEmbed()
      //.setTitle(`[**${user.tag} avatar**](${avatar})`)
      .setDescription(`[**${user.tag} avatar**](${avatar})`)
      .setColor("BLUE")
      .setImage(avatar);

    return message.channel.send(embed);
  }
};
