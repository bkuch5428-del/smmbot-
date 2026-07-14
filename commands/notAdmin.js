/*CMD
  command: notAdmin
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

Bot.sendMessage(
  "⚠️ <b>Channel Verification Failed</b>\n\n" +

  "❌ Bot is <b>NOT admin</b> in required channel.\n\n" +

  "📌 <b>Fix Steps:</b>\n\n" +

  "1️⃣ Apna channel username copy karo\n" +
  "   Example: <code>@yourchannel</code>\n\n" +

  "2️⃣ Bots.Business app open karo\n" +
  "   → apna bot open karo\n\n" +

  "3️⃣ <code>/joined</code> command dhundo\n\n" +

  "4️⃣ Waha channel username replace karo\n" +
  "   (old username hatao → new paste karo)\n\n" +

  "5️⃣ Apne bot ko channel me <b>ADMIN</b> banao\n\n" +

  "⚠️ <b>Important:</b>\n" +
  "Channel public hona chahiye warna verification fail hoga.",
  
  { parse_mode: "html" }
);
