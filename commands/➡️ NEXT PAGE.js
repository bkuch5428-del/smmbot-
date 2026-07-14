/*CMD
  command: ➡️ NEXT PAGE
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

// COMMAND: ➡️ NEXT PAGE

var menu = {
  keyboard: [
    [
      { text: "📊 STATISTICS", style: "primary" },
      { text: "🎟 PROMO CODE", style: "success" }
    ],
    [
      { text: "🎰 BONUS", style: "danger" }
    ],
    [
      { text: "📄 MY CHAT ID", style: "primary" },
      { text: "🛎 SERVICE LIST", style: "success" }
    ],
    [
      { text: "📢 UPDATE CHANNEL", style: "primary" }
    ],
    [
      { text: "⬅️ BACK", style: "danger" }
    ]
  ],
  resize_keyboard: true
}

Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "╔══════════════════╗\n" +
  "      📂 NEXT PAGE\n" +
  "╚══════════════════╝\n\n" +
  "SELECT AN OPTION BELOW:",
  parse_mode: "html",
  reply_markup: JSON.stringify(menu)
})
