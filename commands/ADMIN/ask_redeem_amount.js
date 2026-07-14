/*CMD
  command: ask_redeem_amount
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

let amount = parseInt(message);
if (isNaN(amount) || amount <= 0) {
  return Bot.sendMessage("❌ Enter a valid amount.");
}
User.setProperty("redeem_amount", amount, "integer");

Bot.sendMessage("👥 Enter the number of users who can redeem this code:");
Bot.runCommand("ask_redeem_limit");
