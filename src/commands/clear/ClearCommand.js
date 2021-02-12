const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super("clear", "clear [message amount to delete]", ["c"]);
  }

  run(client, message, args) {
    let messageArray = message.content.split(" ");
    let args2 = messageArray.slice(1);

    if (message.deletable) {
      message.delete();
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return (m) => m.delete(5000); //message.reply("Missing Permissions!").then(m => m.delete(5000))
    }

    if (isNaN(args2[0]) || parseInt(args2[0]) <= 0) {
      return message.reply("This is not a number").then((m) => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args2[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args2[0]);
    }

    message.channel
      .bulkDelete(deleteAmount, true)
      .catch((err) => message.reply(`Something went wrong... ${err}`));
  }
};
