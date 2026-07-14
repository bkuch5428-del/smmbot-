/*CMD
  command: price_list
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

// Command: price_list

let text =
"📋 <b>Service Price List</b>\n" +
"━━━━━━━━━━━━━━\n\n" +

"📸 Instagram Followers — ₹25\n" +
"❤️ Instagram Likes — ₹20\n" +
"👀 Instagram Views — ₹10\n\n" +

"▶️ YouTube Subscribers — ₹90\n" +
"👁 YouTube Views — ₹15\n" +
"👍 YouTube Likes — ₹18\n\n" +

"📨 Telegram Members — ₹12\n" +
"🔥 Telegram Reactions — ₹22\n" +
"👀 Telegram Views — ₹9\n\n" +

"📘 Facebook Likes — ₹18\n" +
"👥 Facebook Followers — ₹22\n" +
"👀 Facebook Views — ₹10\n\n" +

"━━━━━━━━━━━━━━\n" +
"<i>Prices may change anytime.</i>";

Api.sendMessage({
  chat_id: chat.chatid,
  text: text,
  parse_mode: "html"
});
