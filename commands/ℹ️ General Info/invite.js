const Discord = require("discord.js");
const cnf = require('../../config.js');

module.exports = {
  name: "invite",
  aliases: ["getbot"],
  execute: async(client, message, args, data, db) => {
try {
const embed = new Discord.MessageEmbed()
  .setTitle("Invite the bot")
  .setColor('RANDOM')
  .addField("Invite to Discord server", "[Invite the bot here](https://discord.com/api/oauth2/authorize?client_id=819186021686050817&permissions=0&scope=bot)")
  .addField("Server", `[Join to official server](https://discord.gg/PQtDaHP9gb)`)
  .setTimestamp()
message.author.send({embed})

message.channel.send({embed: {
            color: 3447003,
            description: "Check a DM message!"
        }})
} catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
}
}
}
module.exports.help = {
    name: "invite",
    description: "Sends a bot invite",
    usage: "invite",
    type: "General"  
}
