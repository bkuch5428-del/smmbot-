/*CMD
  command: /getflow_qty
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

// Command: /get_qty
User.setProperty("order_step", "get_qty");

let qty = parseInt(message);

if (!isNaN(qty) && qty > 0) {
  User.setProperty("order_qty", qty, "integer");

  Bot.sendMessage(
    "👤 *Instagram Profile Link Required*\n\n" +
    "🔗 Please send the *public Instagram profile link* 👇\n" +
    "_Private profile ya restricted account accept nahi hoga_",
    { parse_mode: "Markdown" }
  );

  // 👇 VERY IMPORTANT
  User.setProperty("order_step", "get_link");

  // 👇 next step command
  Bot.runCommand("/getflow_link");
  return;

} else {
  Bot.sendMessage(
    "❌ *Invalid Quantity*\n\n" +
    "👉 Please enter a *valid number* (example: 100, 500, 1000)",
    { parse_mode: "Markdown" }
  );
  Bot.runCommand("/getflow_qty");
  return;
}
