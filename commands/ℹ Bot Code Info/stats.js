const Discord = require("discord.js");
const ms = require("parse-ms");
const config = require("../../config.js");
const db = require("quick.db");
module.exports = {
  name: "stats",
  aliases: ["botstat", "stat", "botstats", "botinfo"],
  description: "",
  execute: async (client, message, args) => {
    

     var prefix =  db.fetch(`guildprefix_${message.guild.id}`);
    if(!prefix)
    {
      var prefix = ".";
    }

    let uptime = [];

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`);
    });

    const embed = new Discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle(`${client.user.username} stats`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        `Memory Usage:`,
        (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB",
        false
      )
      .setImage(``)
      .addField(`• Servers Count:`, `${client.guilds.cache.size}`, false)
      .addField(`• Users Count:`, `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, false)
      .addField(`• Channels Count:`, `${client.channels.cache.size}`, false)
      .addField(`• Voice Connections:`, `${client.voice.connections.size}`, false)
      .addField(`• My Links:`, `[Invite](https://discord.com/api/oauth2/authorize?client_id=879647365206786078&permissions=8&scope=bot) - [Support](https://discord.gg/a8CZbDpFYs)`, false)
      .addField(`• Made With:`, `Node.js V12`, false)
      .addField(`• Creators:`, `MrRobot#7562 | famN e c h i R404#3980`, false)
      .addField(`• Prefix : `, `${prefix}`, false)
      .addField(`• Uptime:`, uptime.join(", "), false)
    message.channel.send(embed);
  }
};
module.exports.help = {
    name: "stats",
    description: "It will shows you the bot stats",
    usage: "stats",
    type: "General" 
}
