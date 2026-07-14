/*CMD
  command: /getcomments_qty
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
    "🔗 *Instagram Post Link Required*\n\nSend link 👇",
    { parse_mode: "Markdown" }
  );

  User.setProperty("order_step", "get_link");

  Bot.runCommand("/ig_comment_link");

} else {

  Bot.sendMessage("❌ Invalid quantity\nExample: 100 500 1000");

  Bot.runCommand("/getcomments_qty");
}
