/*CMD
  command: /ig_repost_qty
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

// Command: /ig_repost_qty
User.setProperty("order_step", "get_qty");

let qty = parseInt(message);

if (!isNaN(qty) && qty > 0) {
  User.setProperty("order_qty", qty, "integer");

  Bot.sendMessage(
    "🔁 *Instagram Post/Reel Link Required*\n\n" +
    "🔗 Please send the *public Instagram post or reel link* 👇\n" +
    "_Private ya restricted link accept nahi hoga_",
    { parse_mode: "Markdown" }
  );

  // next step
  User.setProperty("order_step", "get_link");
  Bot.runCommand("/ig_repost_link");
  return;

} else {
  Bot.sendMessage(
    "❌ *Invalid Quantity*\n\n" +
    "👉 Please enter a *valid number* (example: 10, 50, 100)",
    { parse_mode: "Markdown" }
  );
  Bot.runCommand("/ig_repost_qty");
  return;
}
