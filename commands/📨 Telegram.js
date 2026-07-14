/*CMD
  command: 📨 Telegram
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

// COMMAND: 🌐 Telegram

var menu = {
  keyboard: [
    [{ text: "👍 TG Reaction" }, { text: "👀 TG Views" }],
    [{ text: "👥 TG Member" }],
    [{ text: "↩️ Back" }]
  ],
  resize_keyboard: true
};

Api.sendMessage({
  chat_id: chat.chatid,
  text: "📢 *Telegram Services*\n\nSelect service 👇",
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(menu)
});
