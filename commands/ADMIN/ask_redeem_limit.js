/*CMD
  command: ask_redeem_limit
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

let limit = parseInt(message);
if (isNaN(limit) || limit <= 0) {
  return Bot.sendMessage("❌ Enter a valid user count.");
}
User.setProperty("redeem_limit", limit, "integer");

Bot.sendMessage("🔤 Now enter the redeem code (example: FESTIVE100):");
Bot.runCommand("ask_redeem_code");
