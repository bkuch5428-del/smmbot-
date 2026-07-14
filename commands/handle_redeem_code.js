/*CMD
  command: handle_redeem_code
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let code = message.trim().toUpperCase();
let codes = Bot.getProperty("redeem_codes") || {};
let data = codes[code];

if (!data) {
  return Bot.sendMessage("❌ Invalid redeem code.");
}

if (data.usedBy.includes(user.telegramid)) {
  return Bot.sendMessage("⚠️ You have already used this code.");
}

if (data.usedBy.length >= data.allowed) {
  return Bot.sendMessage("❌ This redeem code has expired (limit reached).");
}

// Add amount to wallet
let res = Libs.ResourcesLib.userRes("balance");
res.add(data.amount);

// Track usage
data.usedBy.push(user.telegramid);
codes[code] = data;
Bot.setProperty("redeem_codes", codes, "json");

// Build success message
let used = data.usedBy.length;
let remaining = data.allowed - used;

Bot.sendMessage(
  "🎉 <b>Success!</b>\n\n" +
  "✅ <b>Redeem Code:</b> <code>" + code + "</code>\n" +
  "💰 <b>₹" + data.amount + "</b> added to your wallet\n\n" +
  "👥 <b>Used by:</b> " + used + " users\n" +
  "♻️ <b>Remaining:</b> " + remaining + " users\n\n" +
  "👜 <i>Check your wallet for updated balance.</i>",
  { parse_mode: "HTML" }
);
