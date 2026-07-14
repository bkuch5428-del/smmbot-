/*CMD
  command: /ytsub_qty
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
    "🔔 *YouTube Channel Link Required*\n\n" +
    "🔗 Please send the *public YouTube channel link* 👇\n" +
    "_Private channel ya invalid link accept nahi hoga_",
    { parse_mode: "Markdown" }
  );

  // 👇 VERY IMPORTANT
  User.setProperty("order_step", "get_link");

  // 👇 next step command
  Bot.runCommand("/ytsub_link");
  return;

} else {
  Bot.sendMessage(
    "❌ *Invalid Quantity*\n\n" +
    "👉 Please enter a *valid number* (example: 50, 100, 500)",
    { parse_mode: "Markdown" }
  );
  Bot.runCommand("/ytsub_qty");
  return;
}
