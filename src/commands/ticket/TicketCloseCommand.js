const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Ticket2Command extends BaseCommand {
  constructor() {
    super('closeticket', 'ticket', []);
  }

  run(client, message, args) {
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    message.channel.delete();
  }
}