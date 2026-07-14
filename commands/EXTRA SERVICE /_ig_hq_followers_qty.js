/*CMD
  command: /ig_hq_followers_qty
  help: 
  need_reply: true
  auto_retry_time: 
  folder: EXTRA SERVICE 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /ig_hq_followers_qty
User.setProperty("order_step", "get_qty");

let qty = parseInt(message);

if (!isNaN(qty) && qty > 0) {
  User.setProperty("order_qty", qty, "integer");

  Bot.sendMessage(
    "👤 *Instagram Profile Link Required*\n\n" +
    "💎 Service: *Instagram Followers (High Quality)*\n" +
    "💰 Price: *₹198 per 1K Followers*\n\n" +
    "🔗 Please send the *public Instagram profile link* 👇\n" +
    "_Private ya restricted profile accept nahi hoga_",
    { parse_mode: "Markdown" }
  );

  // next step
  User.setProperty("order_step", "get_link");
  Bot.runCommand("/ig_hq_followers_link");
  return;

} else {
  Bot.sendMessage(
    "❌ *Invalid Quantity*\n\n" +
    "👉 Please enter a *valid number* (example: 100, 500, 1000)",
    { parse_mode: "Markdown" }
  );
  Bot.runCommand("/ig_hq_followers_qty");
  return;
}
