const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ['h', 'helppls'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {

    var prefix = db.fetch(`guildprefix_${message.guild.id}`);
    if (!prefix) {
      var prefix = "!";
    }
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
      var commandnum = [];
      readdirSync("./commands/").forEach((dir, files) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
    
        );

        const cmds = commands.map((command) => {
        
          let file = require(`../../commands/${dir}/${command}`);
          
          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });
 
        let data = new Object();
        let data1 = new Object();
       
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);

      });

   let commandscount = "214";

      const embed = new MessageEmbed()
        .addField("🛠️ Moderation", `\`ban, hide, kick, lock, clear , slowmode, unban, unhide, unlock, \``)
        .addField("😀 Fun", `\`calc, hack, poke, rps, youtube, slap, kiss, dog, cat, gay\``)
        .addField("🎶 Music", `\`24/7, bassboost, dc, connect, lyrics, np, pause, play, queue, resume, shuffle, skip, stop, volume\``)
        .addField("🎴 Utility", `\`avatar, covid, id, members, roleid, github, servericon, serverinfo, info,\``)
        .addField("ℹ️ General Info", `\`help, invite, ping, serverstats\``)
        .addField("🎮 Games", `\`poke, slots, tictactoe\``)
        .addField("🤖 Bot Info", `\`servers, stats, uptime\``)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(`<@${message.author.id}>`, embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands! (Some Commands will show on help And they are working just Command is disabled in detaied help command)`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.help.usage}}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.help.description
            ? command.help.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
