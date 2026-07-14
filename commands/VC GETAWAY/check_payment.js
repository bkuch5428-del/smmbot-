/*CMD
  command: check_payment
  help: 
  need_reply: false
  auto_retry_time: 
  folder: VC GETAWAY

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===============================
// VC PAYMENT - CHECK (FINAL FIX)
// ===============================

var API_KEY = "PAY91646C96F5A3C5427A811042";

var orderId = User.getProperty("txn_id");
var amount = User.getProperty("pay_amount");

if (!orderId || !amount) {
  Bot.sendMessage("❌ Transaction data not found.");
  return;
}

// 🔥 REAL DELETE METHOD (IMPORTANT)
Api.deleteMessage({
  chat_id: user.telegramid,
  message_id: request.message.message_id
});

// API CALL
var url =
  "https://vcapi.vcstore.site/payment_api.php" +
  "?api_key=" + API_KEY +
  "&order_id=" + encodeURIComponent(orderId) +
  "&amount=" + encodeURIComponent(amount);

HTTP.get({
  url: url,
  success: "/payment_result"
});

// full credit - @VishalCodeVerse
// full credit - @VishalCodeVerse
// full credit - @VishalCodeVerse
