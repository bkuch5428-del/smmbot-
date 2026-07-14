/*CMD
  command: 📊 STATISTICS
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

// Command: /stats

// 🌍 GLOBAL STATS
let totalUsersRes = Libs.ResourcesLib.anotherChatRes("status", "global");
let totalUsers = totalUsersRes.value();

// 📦 TOTAL ORDERS (GLOBAL)
let totalOrders = Bot.getProperty("total_orders_global", 0);

// 💰 TOTAL DEPOSIT (GLOBAL)
let totalDeposit = Bot.getProperty("total_deposit_global", 0);

// 💸 TOTAL SPENT (GLOBAL)
let totalSpent = Bot.getProperty("total_spent_global", 0);

// 🕒 BOT START DATE (OPTIONAL)
let botStart = Bot.getProperty("bot_start_date");
if (!botStart) {
  botStart = new Date().toLocaleDateString();
  Bot.setProperty("bot_start_date", botStart, "string");
}

// 📊 MESSAGE
let text =
"📊 <b>Panel Statistics</b>\n\n" +

"👥 <b>Total Users:</b> " + totalUsers + "\n" +
"📦 <b>Total Orders:</b> " + totalOrders + "\n\n" +

"💰 <b>Total Deposit:</b> ₹" + totalDeposit + "\n" +
"💸 <b>Total Spent:</b> ₹" + totalSpent + "\n\n" +

"🗓 <b>Bot Started On:</b> " + botStart + "\n\n" +

"⚡ <i>Statistics are updated in real-time</i>";

Api.sendMessage({
  chat_id: chat.chatid,
  text: text,
  parse_mode: "html"
});
