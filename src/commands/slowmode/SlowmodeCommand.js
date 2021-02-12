const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super("slowmode", "slowmode [time-sec]", []);
  }

  run(client, message, args) {
    let messageArray = message.content.split(" ");
    let args2 = messageArray.slice(1);

    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_CHANNELS"])) {
      //message.channel.send("Oopsie, you don't have any rights to do this.")
      return;
    }

    if (!args2[0]) {
      /*
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
      */
      return;
    }

    message.channel.setRateLimitPerUser(args2[0]);
    message.channel.send(
      `This channel: <#${message.channel.id}> has been slowing down for **${args2[0]}**s.`
    );
  }
};
