/*CMD
  command: 🛟 SUPPORT
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

// COMMAND: 🛟 SUPPORT
// full credit - @VishalCodeVerse

var owner = "@bobby_2606"

var buttons = [
  [{
    text: "💬 Contact Support",
    url: "https://t.me/bobby_2606",
    style: "primary"
  }]
]

var msg =
"╔══════════════════╗\n"+
"      🛟 SUPPORT\n"+
"╚══════════════════╝\n\n"+

"Need help or facing any issue?\n\n"+

"👤 Support: "+owner+"\n\n"+

"Click the button below to contact support."

Api.sendMessage({
  chat_id: chat.chatid,
  text: msg,
  reply_markup: { inline_keyboard: buttons }
})
