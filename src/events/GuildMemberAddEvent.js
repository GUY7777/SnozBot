// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const StateManger = require('../utils/StateManger');
const guildWelcomeChannel = new Map();
const guildWelcomeEmbedOrCanvas = new Map();

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    //set bot members stats

    const Discord = require("discord.js");
    const Canvas = require("canvas");

    const channelId = `${guildWelcomeChannel.get(member.guild.id)}`;
    if(channelId === `null`) return;

    const embedOrMessage = `${guildWelcomeEmbedOrCanvas.get(member.guild.id)}`;
    if(embedOrMessage === `null`) return;

    const channel = member.guild.channels.cache.get(channelId);
    if(!channel) return;

    if(embedOrMessage === `embed`){
        //welcome embed
        const userEmbed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag)
        .setTimestamp()
        .setFooter(`Members: ${member.guild.memberCount}`)
        //.setFooter("© Created by  _Guy777#7384")
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`Welcome to ${member.guild},  ${member}`)
        channel.send(userEmbed)

    } else if(embedOrMessage === `canvas`){
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext('2d');
    
      const background = await Canvas.loadImage('./welcome-msg-image2.png');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      // Slightly smaller text placed above the member's display name
      ctx.font = 'bold 40px heebo';
      ctx.fillStyle = '#ffffff';
      //ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
      //ctx.fillText('ברוך הבא לשרת,', canvas.width / 2.5, canvas.height / 3.5);
      ctx.fillText('Welcome to the server', 250, 100);//300, 100
    
      // Add an exclamation point here and below
      ctx.font = 'bold 45px heebo';//sans-serif
      ctx.fillStyle = '#4287f5';
      //ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
      ctx.fillText(`${member.displayName}`, 255, 153); //450, 160

       //
      ctx.font = 'bold 25px heebo';//sans-serif
	    ctx.fillStyle = '#ffffff';
      //ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
      ctx.fillText(`Member #${member.guild.memberCount}`, 355, 200);
    
      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
    
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 25, 25, 200, 200);
    
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');
    
      //channel.send(`Welcome to the server, ${member}!`, attachment);
      channel.send(`Welcome to ${member.guild},  ${member}`, attachment);
    } else if(embedOrMessage === `embed&canvas`) {
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext('2d');
    
      const background = await Canvas.loadImage('./welcome-msg-image.jpg');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      // Slightly smaller text placed above the member's display name
      ctx.font = 'bold 40px heebo';
      ctx.fillStyle = '#ffffff';
      //ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
      //ctx.fillText('ברוך הבא לשרת,', canvas.width / 2.5, canvas.height / 3.5);
      ctx.fillText('Welcome to the server', 250, 100);//300, 100
    
      // Add an exclamation point here and below
      ctx.font = 'bold 45px heebo';//sans-serif
      ctx.fillStyle = '#4287f5';
      //ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
      ctx.fillText(`${member.displayName}`, 255, 153); //450, 160

       //
      ctx.font = 'bold 25px heebo';//sans-serif
	    ctx.fillStyle = '#ffffff';
      //ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
      ctx.fillText(`Member #${member.guild.memberCount}`, 355, 200);
    
      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
    
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 25, 25, 200, 200);
    
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');

      //ctx.fillText(`Member #${member.guild.memberCount}`, 300, 200);

      var Embed = new Discord.MessageEmbed()          
        .setDescription(`ברוך הבא לשרת, ${member}`)
				.setColor("BLUE")
				.setTitle("Welcome `👋`")
        .attachFiles(attachment)
				.setImage(`attachment://welcome-image.jpg`)
				.setTimestamp()
        //.setFooter(`Members: ${member.guild.memberCount}`)
      channel.send(Embed);

    }else return
  }
}

//// welcome channel
StateManger.on('welcomeChannelFetched', (guildId, welcomeChannelId) => {
  guildWelcomeChannel.set(guildId, welcomeChannelId);
});

StateManger.on('welcomeChannelUpdate', (guildId, welcomeChannelId) => {
  guildWelcomeChannel.set(guildId, welcomeChannelId);
});


//// embed or canvas
StateManger.on('welcomeEmbedOrCanvasFetched', (guildId, welcomeEmbedOrCanvas) => {
  guildWelcomeEmbedOrCanvas.set(guildId, welcomeEmbedOrCanvas);
});

StateManger.on('welcomeEmbedOrCanvasUpdate', (guildId, welcomeEmbedOrCanvas) => {
  guildWelcomeEmbedOrCanvas.set(guildId, welcomeEmbedOrCanvas);
});