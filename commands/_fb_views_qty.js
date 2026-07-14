/*CMD
  command: /fb_views_qty
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

User.setProperty("order_step", "get_qty");

let qty = parseInt(message);

if (!isNaN(qty) && qty > 0) {

  User.setProperty("order_qty", qty, "integer");

  Bot.sendMessage(
    "🔗 *Facebook Post/Video Link Required*\n\nSend link 👇",
    { parse_mode: "Markdown" }
  );

  User.setProperty("order_step", "get_link");

  Bot.runCommand("/fb_views_link");

} else {

  Bot.sendMessage(
    "❌ Invalid quantity\n\nExample:\n100\n500\n1000"
  );

  Bot.runCommand("/fb_views_qty");
}
