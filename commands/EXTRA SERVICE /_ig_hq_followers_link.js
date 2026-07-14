/*CMD
  command: /ig_hq_followers_link
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

// Command: /get_link

// 🔒 STEP CHECK
if (User.getProperty("order_step") !== "get_link") {
  return;
}

// 🔧 SAFE LINK READ (BB FIX)
let link = "";

if (message && typeof message === "string") {
  link = message.trim();
} else if (message && message.text) {
  link = message.text.trim();
}

// ❌ still empty
if (!link) {
  Bot.sendMessage("❌ Please send the link again:");
  return;
}

// ✅ STRONG URL VALIDATION
let urlRegex = /^(https?:\/\/)[^\s]+$/i;

if (!urlRegex.test(link)) {
  Bot.sendMessage(
    "❌ Invalid link.\n\n" +
    "👉 Please send a *valid public Instagram profile link*\n" +
    "Example:\nhttps://instagram.com/username",
    { parse_mode: "Markdown" }
  );
  return;
}

// save link
User.setProperty("order_link", link, "string");

// stop step
User.setProperty("order_step", null);

// ---- ORDER SUMMARY ----
let qty = parseInt(User.getProperty("order_qty"));

if (!qty || qty <= 0) {
  Bot.sendMessage("❌ Quantity not found. Please start the order again.");
  return;
}

// 💰 PRICE SETTINGS (HQ)
let price_per_1k = 148; // ₹198 per 1000 (High Quality)

let total_cost = (qty / 1000) * price_per_1k;
total_cost = total_cost.toFixed(2);

// 📦 SUMMARY (HTML SAFE)
let summary =
  "<b>📦 Order Summary</b>\n\n" +
  "👤 <b>Service:</b> Instagram Followers (High Quality)\n" +
  "💎 <b>Quality:</b> High Quality & Stable\n" +
  "🔢 <b>Quantity:</b> " + qty + "\n" +
  "🔗 <b>Profile Link:</b>\n" + link + "\n\n" +
  "💰 <b>Price (Per 1K):</b> ₹" + price_per_1k + "\n" +
  "💵 <b>Total Cost:</b> ₹" + total_cost + "\n\n" +
  "👇 <b>Confirm your order:</b>";

let buttons = {
  inline_keyboard: [
    [
      { text: "✅ Confirm", callback_data: "confirm_order_ighq" },
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
