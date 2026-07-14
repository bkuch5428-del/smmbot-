/*CMD
  command: 🎟 PROMO CODE
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
  "🎟 <b>Redeem Code</b>\n\n" +
  "Enter your <b>redeem code</b> below to claim your reward 👇\n\n" +
  "<code>Example: ABCD1234</code>\n\n" +
  "📌 <i>Make sure the code is correct and unused.</i>",
  { parse_mode: "html" }
);

Bot.runCommand("handle_redeem_code");
