/*CMD
  command: /set_amount
  help: 
  need_reply: true
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
// * SAVE AMOUNT *
// ===============================
var amount = Number(message);

if (!amount || amount < 1) {
  Bot.sendMessage("❌ Minimum deposit amount is <b>₹1</b>.", {
    parse_mode: "HTML"
  });
  return;
}

if (amount > 10000) {
  Bot.sendMessage("❌ Maximum deposit amount is <b>₹10,000</b>.", {
    parse_mode: "HTML"
  });
  return;
}

// Save Amount
User.setProperty("pay_amount", amount, "string");

// Generate QR after valid input
Bot.runCommand("/generate_qr");
