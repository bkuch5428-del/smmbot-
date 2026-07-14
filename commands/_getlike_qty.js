/*CMD
  command: /getlike_qty
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

  Bot.sendMessage("*🔗 Give Instagram Reel Link 🔗 Jo Public Ho 💥:*");

  // 👇 VERY IMPORTANT
  User.setProperty("order_step", "get_link");

  // 👇 command ko run karo taaki next message aaye
  Bot.runCommand("/getlike_link");
  return;

} else {
  Bot.sendMessage("❌ Invalid quantity. Please enter a valid number:");
  Bot.runCommand("/getlike_qty");
  return;
}
