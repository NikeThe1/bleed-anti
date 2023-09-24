const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, webhook) => {

  if (!webhook.guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

  // SERVER DATA

  const serverdata = await serverdataschema.findOne({ GuildID: webhook.guild.id })

  if (!serverdata) return

  // IF MODULE IS NOT ENABLED THEN RETURN

  if (serverdata.AntiNukeToggleWebhook !== 'true') return

  const auditlogs = await webhook.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.WebhookCreate }).catch(() => { })
  
  if (!auditlogs) return

  const webhooklog = auditlogs?.entries.first()
  
  if (!webhooklog) return
  
  const { executor } = webhooklog

  // OWNER & CLIENT

  if (executor.id == webhook.guild.ownerId || executor.id == client.user.id) return

  // NUKER

  const nuker = await webhook.guild.members.fetch(executor.id).catch(() => { })

  if (!nuker) return

  // WHITELISTED USERS

  const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
  if (whitelistedusers.includes(executor.id)) return

  // PUNISHMENT

  const antinukewebhookpunishment = serverdata.AntiNukeWebhookPunishment

  let entrywebhook = client.webhookcreatethreshold.get(executor.id)
  if (!entrywebhook) {
    client.webhookcreatethreshold.set(executor.id, 1);
  } else {
    client.webhookcreatethreshold.set(executor.id, entrywebhook + 1);
  }

  const webhookcreatethreshold = client.webhookcreatethreshold.get(executor.id)

  if (webhookcreatethreshold >= serverdata.AntiNukeWebhookThreshold) {

    if (antinukewebhookpunishment === 'ban') {

      if (nuker.bannable) {

        client.banuser(webhook.guild, executor.id, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a webhook`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a webhook and was removed of power`)
      
        await webhook.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(() => { })))

        client.webhookcreatethreshold.delete(executor.id)
      }

    } else if (antinukewebhookpunishment === 'kick') {

      if (nuker.kickable) {

        client.kickuser(webhook.guild, executor.id, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a webhook`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a webhook and was removed of power`)
      
        await webhook.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(() => { })))

        client.webhookcreatethreshold.delete(executor.id)
      }

    } else if (antinukewebhookpunishment === 'stripstaff') {

      client.stripuser(webhook.guild, nuker, Discord.PermissionsBitField.Flags.ManageWebhooks, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a webhook`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a webhook and was removed of power`)
    
      await webhook.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(() => { })))

      client.webhookcreatethreshold.delete(executor.id)
    }
  }

  setTimeout(() => {
    client.webhookcreatethreshold.delete(executor.id)
  }, 60000)
}