const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UserInfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'userinfo @user', ['user']);
  }

  run(client, message, args) {
    const Discord = require("discord.js");
    var moment = require("moment")
    
    let user = message.mentions.users.first() || message.author; // You can do it by mentioning the user, or not.
    
      if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
      if (user.presence.status === "idle") user.presence.status = "Idle";
      if (user.presence.status === "offline") user.presence.status = "Offline";
      if (user.presence.status === "online") user.presence.status = "Online";
      
      function game() {
        let game;
        if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
        else if (user.presence.activities.length < 1) game = "None"; // This will check if the user doesn't playing anything.
        return game; // Return the result.
      }
      
      let x = Date.now() - user.createdAt; // Since the user created their account.
      let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
      let created = Math.floor(x / 86400000); // 5 digits-zero.
      let joined = Math.floor(y / 86400000);
      
      const member = message.guild.member(user);
      let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None"; // Nickname
      let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Created Date
      let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Joined the Server Date
      let status = user.presence.status; // DND, IDLE, OFFLINE, ONLINE
      let avatar = user.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, avatar)
      .setThumbnail(avatar)
      .setTimestamp()
      .setColor("BLUE")
      .addField("ID", user.id, true)
      .addField("Nickname", nickname, true)
      .addField("Created Account Date", `${createdate} \nsince ${created} day(s) ago`, true)
      .addField("Joined Guild Date", `${joindate} \nsince ${joined} day(s) ago`, true)
      .addField("Status", status, true)
      .addField("Game", game(), true)
      //.attachFiles('./userinfo-img.png')
      //.setImage('attachment://userinfo-img.png')
      .setImage('https://i.imgur.com/E941R50.png')
      
      message.channel.send(embed); // Let's see if it's working.
  }
}