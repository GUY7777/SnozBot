const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = class TranslateCommand extends BaseCommand {
  constructor() {
    super("translate", "translate <language> <sentence>", ["tr"]);
  }

  async run(client, message, args, prefix) {
    let language = args[0];
    let text = args.slice(1).join(" ");

    if (!language)
      return message.reply(
        "What language am I supposed to translate to?`" +
          ` Usage: ${prefix}translate <language> <sentence>` +
          "`"
      );
    if (language.length !== 2)
      return message.reply(
        "Language must be the 2 letter alias. E.g `English` -> `en` -> `" +
          ` Usage: ${prefix}translate <language> <sentence>` +
          "`"
      );
    if (!text)
      return message.reply(
        "What am I supposed to translate?`" +
          ` Usage: ${prefix}translate <language> <sentence>` +
          "`"
      );

    try {
      const result = await translate(text, { to: language });

      const embed = new MessageEmbed()
        .setDescription(result.text)
        .setColor("BLUE")
        .setFooter(message.author.username)
        .setTimestamp()
        .setAuthor("Google Translate", message.author.displayAvatarURL());

      message.channel.send(embed);
    } catch {
      return message.reply(
        "I do not support this language`" +
          ` Usage: ${prefix}translate <language> <sentence>` +
          "` Language must be the 2 letter alias. E.g `English` -> `en`"
      );
    }
  }
};
