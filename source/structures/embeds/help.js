const Discord = require('discord.js')

module.exports = class help {
  constructor (message, options) {

    if (options) {

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.maincolor)
      .setAuthor({ name: 'bleed help', iconURL: `https://bleed.bot/img/bot_avatar_default.png` })
      .setTitle(`Command: ${options.command}`)
      .setDescription(`${options.description}\n\`\`\`${options.syntax}\n${options.example}\`\`\``)

      return message.channel.send({ embeds: [embed] })
    }
  }
}