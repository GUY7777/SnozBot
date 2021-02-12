const BaseCommand = require('../../utils/structures/BaseCommand');
const { tictactoe } = require('reconlx')

module.exports = class TictactoeCommand extends BaseCommand {
  constructor() {
    super('tictactoe', 'tictactoe', ['tic','tac','toe','t']);
  }

  run(client, message, args) {
    const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member `!tictactoe @member`')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
  }
}