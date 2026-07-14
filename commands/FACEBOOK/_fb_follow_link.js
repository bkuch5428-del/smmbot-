/*CMD
  command: /fb_follow_link
  help: 
  need_reply: true
  auto_retry_time: 
  folder: FACEBOOK

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (User.getProperty("order_step") !== "get_link") return;

let link = "";

if (message && typeof message === "string")
  link = message.trim();
else if (message.text)
  link = message.text.trim();

if (!link) {
  Bot.sendMessage("❌ Send link again");
  return;
}

let urlRegex = /^(https?:\/\/)[^\s]+$/i;

if (!urlRegex.test(link)) {
  Bot.sendMessage("❌ Send valid Facebook link");
  return;
}

User.setProperty("order_link", link, "string");
User.setProperty("order_step", null);

let qty = parseInt(User.getProperty("order_qty"));

if (!qty || qty <= 0) {
  Bot.sendMessage("❌ Quantity missing");
  return;
}

let price_per_1k = 34.4;

let total_cost = ((qty / 1000) * price_per_1k).toFixed(2);

let summary =
  "<b>📦 Order Summary</b>\n\n" +
  "👥 <b>Service:</b> Facebook Followers\n" +
  "🔢 <b>Quantity:</b> " + qty + "\n" +
  "🔗 <b>Link:</b>\n" + link + "\n\n" +
  "💰 <b>Price:</b> ₹" + price_per_1k + " /1K\n" +
  "💵 <b>Total:</b> ₹" + total_cost + "\n\n" +
  "Confirm order?";

let buttons = {
  inline_keyboard: [
    [
      { text: "✅ Confirm", callback_data: "confirm_order_fbfollowers" },
      { text: "❌ Cancel", callback_data: "cancel_order" }
    ]
  ]
};

Api.sendMessage({
  chat_id: chat.chatid,
  text: summary,
  parse_mode: "html",
  reply_markup: JSON.stringify(buttons)
});
