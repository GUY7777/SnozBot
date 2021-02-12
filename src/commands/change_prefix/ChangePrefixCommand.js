const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManger = require("../../utils/StateManger");

module.exports = class ChangePrefixCommand extends BaseCommand {
  constructor() {
    super("changeprefix", "changeprefix [new prefix]", [
      "chprefix",
      "setprefix",
    ]);
    this.connection = StateManger.connection;
  }

  async run(client, message, args) {
    if (message.member.id === message.guild.ownerID) {
      const [cmdName, newPrefix] = message.content.split(" ");
      if (newPrefix) {
        try {
          await this.connection.query(
            `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}' `
          );
          message.channel.send(`Updated guild prefix to ${newPrefix}`);
          StateManger.emit("prefixUpdate", message.guild.id, newPrefix);
        } catch (err) {
          console.log(err);
          message.channel.send(`Failed to update guild prefix to ${newPrefix}`);
        }
      } else {
        message.channel.send("Incorrect amount of arguments");
      }
    } else {
      message.channel.send("You do not have premission to use that command");
    }
  }
};
