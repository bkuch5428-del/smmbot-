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

var API_KEY = Bot.getProperty("VC_API_KEY");
if (!API_KEY) {
  Bot.sendMessage(
    "❌ <b>Payment API Key Not Configured</b>\n\n" +
    "Admin must set the VC_API_KEY bot property in the Bots.Business dashboard.",
    { parse_mode: "html" }
  );
  return;
}

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
