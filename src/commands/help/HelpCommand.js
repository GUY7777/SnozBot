const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "help", ["h"]);
  }

  async run(client, message, args, prefix) {
    const data = [];
    const data2 = [];

    let commands = Array.from(client.commands.keys());
    let command = args[0];

    const helpCmds = commands.map((cmd) => {
      return client.commands.get(cmd).name;
    });
    const helpCmds2 = helpCmds.filter((data, index) => {
      return helpCmds.indexOf(data) === index;
    });

    if (!args.length) {
      var Embed = new Discord.MessageEmbed()
        .setDescription(`Here\'s a list of all my commands:\n`)
        .setColor("BLUE")
        .setTitle("Help")
        //.attachFiles('./help-img.png')
        //.setImage('attachment://help-img.png')
        .setImage("https://i.imgur.com/YeoG25W.png");
      const helpCmds3 = helpCmds2.map((cmd) => {
        data2.push(cmd);
      });

      Embed.addField(
        "`" + `commands` + "`",
        data2.map((cmd) => cmd).join(`\n`),
        true
      );
      Embed.addField(
        "**Usage: **",
        "You can use these commands using`" +
          prefix +
          "[command name]`" +
          `\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command! \n`
      );
      return message.channel.send(Embed);
    }

    let cmdName = client.commands.get(command, command.name);

    if (!client.commands.has(command))
      return message.reply("that's not a valid command!");
    if (!command) {
      return message.reply("that's not a valid command!");
    }
    /*
    if(cmdName.description.length) data.push("**Description: **`"+cmdName.description+"`"); 
    else data.push("**Description: **`"+"do something"+"`"); 
    */
    data.push("**Name:** `" + cmdName.name + "`");
    if (cmdName.aliases.length)
      data.push("**Aliases: **`" + cmdName.aliases.join(", ") + "`");
    data.push("**Description: **`" + "do something" + "`");
    data.push("**Usage: **`" + prefix + cmdName.category + "`");

    message.channel.send(data, {
      split: true,
    });
  }
};
