const Discord = require('discord.js')

module.exports = class embed {
  constructor (message, content, options) {

    if (options === 'approve') {

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.approve)
      .setDescription(`${message.client.emotes.approve} ${message.author}: ${content}`)

      return message.channel.send({ embeds: [embed] })

    } else if (options === 'warn') {

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.warn)
      .setDescription(`${message.client.emotes.warn} ${message.author}: ${content}`)

      return message.channel.send({ embeds: [embed] })

    } else if (options === 'deny') {

      const embed = new Discord.EmbedBuilder()
  
      .setColor(message.client.colors.deny)
      .setDescription(`${message.client.emotes.deny} ${message.author}: ${content}`)
  
      return message.channel.send({ embeds: [embed] })

    } else if (options === 'neutral') {

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.neutral)
      .setDescription(`${message.client.emotes.neutral} ${message.author}: ${content}`)

      return message.channel.send({ embeds: [embed] })

    } else if (options === 'maincolor') {

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.maincolor)
      .setDescription(`${message.author}: ${content}`)

      return message.channel.send({ embeds: [embed] })
    }
  }
}