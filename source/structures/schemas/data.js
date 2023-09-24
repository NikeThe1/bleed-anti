const mongoose = require('mongoose')

const serverdataschema = new mongoose.Schema({
  GuildID: String,
  Prefix: String,
  AntiNukeLogChannel: String,
  // MODULES
  AntiNukeToggleBan: String,
  AntiNukeToggleKick: String,
  AntiNukeToggleWebhook: String,
  AntiNukeToggleChannel: String,
  AntiNukeToggleEmoji: String,
  AntiNukeToggleRole: String,
  AntiNukeToggleVanity: String,
  AntiNukeToggleBot: String,
  // WHITELISTED
  AntiNukeWhitelistedUsers: Array,
  AntiNukeWhitelistedAdmins: Array,
  // PERMISSIONS
  AntiNukePermissionGrants: Array,
  AntiNukePermissionRemoves: Array,
  // PUNISHMENTS
  AntiNukeBanPunishment: String,
  AntiNukeKickPunishment: String,
  AntiNukeRolePunishment: String,
  AntiNukeChannelPunishment: String,
  AntiNukeEmojiPunishment: String,
  AntiNukeWebhookPunishment: String,
  AntiNukeVanityPunishment: String,
  AntiNukeBotPunishment: String,
  // THRESHOLDS
  AntiNukeBanThreshold: String,
  AntiNukeKickThreshold: String,
  AntiNukeRoleThreshold: String,
  AntiNukeChannelThreshold: String,
  AntiNukeEmojiThreshold: String,
  AntiNukeWebhookThreshold: String
})

module.exports = mongoose.model('server', serverdataschema)