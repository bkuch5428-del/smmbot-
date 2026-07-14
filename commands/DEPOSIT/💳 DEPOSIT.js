/*CMD
  command: 💳 DEPOSIT
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

// ======================================
// *      VC PAYMENT GATEWAY         *
// *        ENTER AMOUNT             *
// ======================================

Bot.sendMessage(
  "<b>💰 Enter Your Deposit Amount</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  "• Minimum Deposit: <b>₹10</b>\n" +
  "• Enter the amount you want to add.\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "<i>Example:</i> <code>100</code>",
  { parse_mode: "HTML" }
);

Bot.runCommand("/set_amount");
