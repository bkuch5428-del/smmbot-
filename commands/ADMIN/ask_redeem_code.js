/*CMD
  command: ask_redeem_code
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let code = message.trim().toUpperCase();
if (!code) {
  return Bot.sendMessage("❌ Please enter a valid redeem code.");
}

let allCodes = Bot.getProperty("redeem_codes") || {};

if (allCodes[code]) {
  return Bot.sendMessage("⚠️ This code already exists. Try a new one.");
}

let amount = User.getProperty("redeem_amount");
let limit = User.getProperty("redeem_limit");

allCodes[code] = {
  amount: amount,
  allowed: limit,
  usedBy: [] // Telegram IDs of users who used it
};

Bot.setProperty("redeem_codes", allCodes, "json");

Bot.sendMessage(
  "✅ Redeem code created:\n\n" +
  "🔤 *Code:* `" + code + "`\n" +
  "💰 *Amount:* ₹" + amount + "\n" +
  "👥 *Allowed Users:* " + limit,
  { parse_mode: "Markdown" }
);
