/*CMD
  command: /generate_qr
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
// VC PAYMENT - START (FIXED PHOTO)
// ===============================

var txnid = "ORD" + Date.now();
var amount = User.getProperty("pay_amount");

// Save order
User.setProperty("txn_id", txnid, "string");

// UPI pay — reads UPI ID set by admin via /setupi
var upiId = Bot.getProperty("UPI_ID") || "paytm.s1dw5n0@pty";
var upi =
  "upi://pay?pa=" + upiId +
  "&pn=VC Payment Gateway" +
  "&tid=" + txnid +
  "&tr=" + txnid +
  "&tn=VC Payment" +
  "&am=" + amount +
  "&cu=INR";

// FIXED QR (safe format)
var qr = "https://quickchart.io/qr?text=" + encodeURIComponent(upi);

// Send
Api.sendPhoto({
  chat_id: user.telegramid,
  photo: qr,
  caption:
    "╔════════════════════╗\n" +
    "     💳 *VC PAYMENT GATEWAY*\n" +
    "╚════════════════════╝\n\n" +
    "💰 *Amount:* ₹" + amount + "\n" +
    "🆔 *Order ID:* `" + txnid + "`\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "⚠️ Complete the payment using the QR code above.\n" +
    "After successful payment, tap the button below.\n" +
    "━━━━━━━━━━━━━━━━━━",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "✅ Check Payment", callback_data: "check_payment" }]
    ]
  }
});
