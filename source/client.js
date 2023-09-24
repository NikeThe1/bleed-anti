const fs = require('fs')
const mongoose = require('mongoose')
const Discord = require('discord.js')

module.exports = class Client extends Discord.Client {

  constructor () {
    super ({
      intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildModeration, Discord.GatewayIntentBits.GuildWebhooks],
      partials: [Discord.Partials.Message, Discord.Partials.GuildMember, Discord.Partials.Channel],
      allowedMentions: { parse: [ 'everyone', 'users', 'roles' ] },
    })

    this.client = this

    Object.defineProperty(Array.prototype, 'paginate', {
      value: function (n) {
        return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n))
      }
    })

    this.token = ''
    this.mongourl = ''

    this.support_server = 'discord.gg/bleed'
    this.developer = 'put_your_name_my_guy'

    this.help = require('./structures/embeds/help')
    this.embed = require('./structures/embeds/response')
    this.antinuke = require('./structures/embeds/antinuke')
    this.pagination = require('./structures/client/pagination')

    this.commands = new Discord.Collection()
    this.aliases = new Discord.Collection()

    this.banthreshold = new Map()
    this.kickthreshold = new Map()
    this.roledeletethreshold = new Map()
    this.emojideletethreshold = new Map()
    this.channelthreshold = new Map()
    this.webhookcreatethreshold = new Map()

    this.colors = {
      maincolor: '#95a5a6',
      approve: '#a3eb7b',
      deny: '#fe6464',
      warn: '#efa23a',
      neutral: '#6495ed',
    }

    this.emotes = {
      approve: '',
      deny: '',
      warn: '',
      neutral: '🔎',
      previous: '',
      next: '',
      skip: '',
      cancel: ''
    }
  }

  async logger (text) {

    console.log(text)
  }

  async database () {

    mongoose.set('strictQuery', false)

    mongoose.connect(this.mongourl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { this.logger('Connected to database') })   
  }

  async connect (token) {

    super.login(token)

    setTimeout(() => {
      this.user.setActivity(this.support_server, {
        type: Discord.ActivityType.Competing
      })
    }, 30000)

    setInterval(() => {
      this.user.setActivity(this.support_server, {
        type: Discord.ActivityType.Competing
      })
    }, 600000)

    this.loadevents(), this.loadcommands()
  }

  loadevents () {

    fs.readdirSync('./source/events').forEach(async (directory) => {

      const files = fs.readdirSync(`./source/events/${directory}/`).filter((file) => file.endsWith('.js'))

      for (const file of files.values()) {
                
        const eventbuilder = require(`./../source/events/${directory}/${file}`)

        const name = file.split('.')[0]
        this.on(name, eventbuilder.bind(null, this))
      }
    })
  }

  loadcommands () {

    fs.readdirSync('./source/commands/').forEach(async (directory) => {

      const commands = fs.readdirSync(`./source/commands/${directory}`).filter(file => file.endsWith('.js'))
  
      for (let file of commands) {

        let pull = require(`./commands/${directory}/${file}`)

        if (pull.name) {

          this.commands.set(pull.name, pull)

        } else {
          
          continue
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name))
      }
    })
  }

  async banuser (guild, executor, logchannel, reason, logreason) {

    await guild.members.ban(executor, { reason: `antinuke: ${reason}` }).then(() => {

      var antilogchannel = guild.channels.cache.get(logchannel)
      if (!antilogchannel) return

      return new guild.client.antinuke(
        antilogchannel,
        guild.client, 
        {
          description: `${logreason}`
        }
      )

    }).catch(() => { })
  }

  async kickuser (guild, executor, logchannel, reason, logreason) {

    await guild.members.kick(executor, `antinuke: ${reason}`).then(() => {

      var antilogchannel = guild.channels.cache.get(logchannel)
      if (!antilogchannel) return

      return new guild.client.antinuke(
        antilogchannel,
        guild.client, 
        {
          description: `${logreason}`
        }
      )

    }).catch(() => { })
  }

  async stripuser (guild, nuker, permission1, permission2, logchannel, reason, logreason) {

    nuker.roles.cache.forEach(async r => {
  
      if (nuker.user.bot && r.managed) {

        if (r.permissions.has(permission1)) {

          r.edit({ permissions: r.permissions.remove(permission1), reason: `antinuke: ${reason}` }).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }

        if (r.permissions.has(permission2)) {

          r.edit({ permissions: r.permissions.remove(permission2), reason: `antinuke: ${reason}` }).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }

      } else {

        const rolepermissions = [permission1, permission2]

        if (r.permissions.has(rolepermissions)) {

          nuker.roles.remove(r, `antinuke: ${reason}`).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }
      }
    })
  }

  async victimuser (victim, permission1, reason, permission2) {

    victim.roles.cache.forEach(async r => {

      const rolepermissions = [permission1, permission2]

      if (r.permissions.has(rolepermissions)) {

        victim.roles.remove(r, `antinuke: ${reason}`).catch(() => { })
      }
    })
  }

  async victimuser2 (victim, member, permission1, reason) {

    victim.roles.cache.forEach(async r => {
  
      if (!victim.permissions.has(permission1)) {

        const roles = member.roles.cache.find(r => r.permissions.has(permission1))

        victim.roles.add(roles, `antinuke: ${reason}`).catch(() => { })
      }
    })
  }
}