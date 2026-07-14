/*CMD
  command: 📢 UPDATE CHANNEL
  help: 
  need_reply: false
  auto_retry_time: 
  folder: VISHAL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// COMMAND: 📢 Update Channel
// full credit - @VishalCodeVerse
var update_channel = "https://t.me/moviesmasterupdates"
var owner_username = "@bobby_2606"

var botname = "@" + bot.name

var buttons = [
  [{
    text: "📢 JOIN CHANNEL",
    url: update_channel,
    style: "primary",
    icon_custom_emoji_id: "5359664288241829619"
  }],
  [
    {
      text: "👤 OWNER",
      url: "https://t.me/" + owner_username.replace("@",""),
      style: "success"
    },
    {
      text: "🤖 BOT",
      url: "https://t.me/" + bot.name,
      style: "danger"
    }
  ]
]

var msg =
"╭━━━〔 📢 UPDATE HUB 〕━━━╮\n\n" +

"🚀 Stay connected for:\n" +
"• Latest Updates\n" +
"• New Features\n" +
"• Service News\n" +
"• Special Announcements\n\n" +

"━━━━━━━━━━━━━━\n" +
"👤 Owner : " + owner_username + "\n" +
"🤖 Bot   : " + botname + "\n" +
"━━━━━━━━━━━━━━\n\n" +

"✨ Join now and never miss an update!"

Api.sendMessage({
  chat_id: chat.chatid,
  text: msg,
  reply_markup: {
    inline_keyboard: buttons
  }
})
