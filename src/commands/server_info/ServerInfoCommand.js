const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServerInfoCommand extends BaseCommand {
  constructor() {
    super('serverinfo', 'serverinfo', ['server', 'info','stats']);
  }

  run(client, message, args) {
    const Discord = require("discord.js");

    var myGuild = client.guilds.cache.get(message.guild.id);
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };
    let region = {
        "europe": ":flag_eu: Europe",
        "singapore": ":flag_sg: Singapore",
        "sydney": ":flag_au: Sydney",
        "us-central": ":flag_us: U.S. Central",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "brazil": ":flag_br: Brazil",
        "india": ":flag_in: India",
        "japan": ":flag_jp: Japan",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
      };

    const serverinfo = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .addField("Name", message.guild.name, true)
      .addField("ID", message.guild.id, true)
      .addField("Owner", `<@!${message.guild.owner.user.id}>#${message.guild.owner.user.discriminator}`, true)
      .addField("Region", region[message.guild.region], true)
      .addField("Total Members", `${myGuild.memberCount}`, true)
      .addField("Channels", myGuild.channels.cache.size, true)
      .addField("Roles", myGuild.roles.cache.size, true)
      .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
      .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
      .addField('AFK Channel', `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.cache.get(message.guild.afkChannelID).name}`, true)
      .setThumbnail(message.guild.iconURL())
      //.attachFiles('./2info-img.png')
      //.setImage('attachment://2info-img.png')
      .setImage("https://i.imgur.com/7G55wAl.png")
    message.channel.send(serverinfo);  
  }
}