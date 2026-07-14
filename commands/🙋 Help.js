/*CMD
  command: 🙋 Help
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

// Command: help

let text =
"🙋‍♂️ *Help Center*\n\n" +
"✔ Safe & trusted orders\n" +
"✔ Balance deducted after success\n" +
"✔ Real-time tracking available\n\n" +

"📌 *Important*\n" +
"• Orders can't be cancelled\n" +
"• Public links only\n" +
"• Speed depends on quantity\n\n" +

"👨‍💻 Support: @VishalCodeVerseOwner";

let buttons = {
  inline_keyboard: [
    [{ text: "📋 Price List", callback_data: "price_list" }]
  ]
};

Api.sendMessage({
  chat_id: chat.chatid,
  text: text,
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(buttons)
});
