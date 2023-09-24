const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, guild) => {

  // CREATE SERVER DATA ON JOIN

  const data = new serverdataschema({
    GuildID: guild.id,
    Prefix: ',',
    AntiNukeLogChannel: null,
    AntiNukeToggleBan: null,
    AntiNukeToggleKick: null,
    AntiNukeToggleWebhook: null,
    AntiNukeToggleChannel: null,
    AntiNukeToggleEmoji: null,
    AntiNukeToggleRole: null,
    AntiNukeToggleVanity: null,
    AntiNukeToggleBot: null,
    AntiNukeWhitelistedUsers: [],
    AntiNukeWhitelistedAdmins: [],
    AntiNukePermissionGrants: [],
    AntiNukePermissionRemoves: [],
    AntiNukeBanPunishment: 'ban',
    AntiNukeKickPunishment: 'ban',
    AntiNukeRolePunishment: 'ban',
    AntiNukeChannelPunishment: 'kick',
    AntiNukeEmojiPunishment: 'ban',
    AntiNukeWebhookPunishment: 'ban',
    AntiNukeVanityPunishment: 'stripstaff',
    AntiNukeBotPunishment: 'stripstaff',
    AntiNukeBanThreshold: '1',
    AntiNukeKickThreshold: '1',
    AntiNukeRoleThreshold: '1',
    AntiNukeChannelThreshold: '1',
    AntiNukeEmojiThreshold: '1',
    AntiNukeWebhookThreshold: '1'
  })

  data.save()
}