/*CMD
  command: 🎉 REFER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// COMMAND: 🎉 REFER

var perref = 1   // Amount user gets per referral (₹)

let stat = Bot.getProperty("" + user.telegramid + "?Ban")

// ===== BAN CHECK =====
if (stat == "ban") {
  Bot.sendMessage("❌ <b>You are banned from using this bot.</b>", { parse_mode: "html" })
  return
}

// ===== REFERRAL LINK =====
let invLink = RefLib.getRefLink(bot.name, "Bot")

// ===== DELETE OLD INLINE MESSAGE =====
if (request.data) {
  Api.deleteMessage({
    message_id: request.message.message_id
  })
}

// ===== MESSAGE =====
var msg =
"╔════════════════════╗\n" +
"      🎉 REFER & EARN\n" +
"╚════════════════════╝\n\n" +

"👥 <b>Total Referrals:</b> " + RefLib.getRefCount() + "\n\n" +

"🔗 <b>Your Invite Link</b>\n" +
"<code>" + invLink + "</code>\n\n" +

"💰 <b>Reward:</b> ₹" + perref + " per referral\n" +
"📊 1 Point = ₹1\n\n" +

"🚀 <i>Share your link and start earning!</i>"

// ===== SEND MESSAGE =====
Api.sendMessage({
  text: msg,
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👥 My Referrals",
          callback_data: "/myrefers",
          style: "primary"
        },
        {
          text: "🏆 Top Inviters",
          callback_data: "/toplist",
          style: "success"
        }
      ]
    ]
  }
})
