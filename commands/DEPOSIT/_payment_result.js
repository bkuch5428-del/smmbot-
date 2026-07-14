/*CMD
  command: /payment_result
  help: 
  need_reply: false
  auto_retry_time: 
  folder: DEPOSIT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===============================
// VC PAYMENT GATEWAY - RESULT
// ===============================

try {

  var data = JSON.parse(content);
  var orderId = User.getProperty("txn_id");
  var amount = Number(data.amount_credited || data.amount || 0);

  var balance = Libs.ResourcesLib.userRes("balance");

  // Get Admin ID from Bot Property
  var admin = Bot.getProperty("ADMIN_ID");

  if (data.status == "success") {

    // Add Balance
    balance.add(amount);

    // Clear Temp Data
    User.setProperty("txn_id", "", "string");
    User.setProperty("pay_amount", "", "string");

    // USER SUCCESS MESSAGE
    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "🎉 *Payment Successful!*\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "🆔 *Order ID:* `" + orderId + "`\n" +
        "💰 *Amount Added:* ₹" + amount + "\n" +
        "💳 *Current Balance:* ₹" + balance.value().toFixed(2) + "\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "✅ Your wallet has been credited successfully.",
      parse_mode: "Markdown"
    });

    // ADMIN NOTIFICATION
    Api.sendMessage({
      chat_id: admin,
      text:
        "🟢 *New Successful Payment*\n\n" +
        "👤 *User ID:* `" + user.telegramid + "`\n" +
        "🆔 *Order ID:* `" + orderId + "`\n" +
        "💰 *Amount:* ₹" + amount,
      parse_mode: "Markdown"
    });

  } else {

    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "❌ *Payment Not Found*\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "🆔 *Order ID:* `" + orderId + "`\n" +
        "📌 *Status:* " + (data.message || "Pending") + "\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "Please complete your payment and try again.",
      parse_mode: "Markdown"
    });

  }

} catch (e) {

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "⚠️ *Gateway Error*\n\n" +
      "Unable to verify your payment at the moment.\nPlease try again later.",
    parse_mode: "Markdown"
  });

  // Admin Debug Alert
  Api.sendMessage({
    chat_id: Bot.getProperty("ADMIN_ID"),
    text:
      "⚠️ *VC Payment Gateway Error*\n\n" +
      "```" + e + "```",
    parse_mode: "Markdown"
  });

}
