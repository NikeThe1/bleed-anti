const Discord = require('discord.js')

module.exports = class antinuke {
  constructor (channel, client, options) {

    if (options) {

      const embed = new Discord.EmbedBuilder()

      .setColor(client.colors.deny)
      .setDescription(`${options.description}`)

      return channel.send({ embeds: [embed] })
    }
  }
}