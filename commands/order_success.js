/*CMD
  command: order_success
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /order_success

try {

  // ===== PARSE RESPONSE =====
  let res;
  try {
    res = JSON.parse(content);
  } catch (e) {
    return Bot.sendMessage(
      "❌ <b>Invalid Server Response</b>\n\n" +
      "<code>" + content + "</code>",
      { parse_mode: "html" }
    );
  }

  // ===== PANEL ERROR =====
  if (res.error) {
    return Bot.sendMessage(
      "❌ <b>Order Failed</b>\n\n" +
      "🛑 <b>Panel Error:</b> " + res.error,
      { parse_mode: "html" }
    );
  }

  // ===== ORDER ID CHECK =====
  if (!res.order) {
    return Bot.sendMessage(
      "❌ <b>Order Failed</b>\n\n" +
      "⚠️ Unexpected Response:\n<code>" +
      JSON.stringify(res, null, 2) +
      "</code>",
      { parse_mode: "html" }
    );
  }

  let orderId = String(res.order);

  // ===== GET AMOUNT =====
  let amount = parseFloat(User.getProperty("pending_amount", 0)) || 0;

  // ===== BALANCE RESOURCE SAFE =====
  let balance = Libs.ResourcesLib.userRes("balance");

  if (amount > 0 && balance) {
    balance.remove(amount);
  }

  // clear pending
  User.setProperty("pending_amount", 0);

  // ===== TOTAL ORDERS =====
  let totalOrders = parseInt(User.getProperty("total_orders", 0)) + 1;
  User.setProperty("total_orders", totalOrders, "integer");

  // ===== SAVE ORDER ID =====
  let myOrders = User.getProperty("my_orders", []);

  if (!Array.isArray(myOrders)) {
    myOrders = [];
  }

  myOrders.push(orderId);
  User.setProperty("my_orders", myOrders, "json");

  // ===== GLOBAL STATS =====
  let gOrders = parseInt(Bot.getProperty("total_orders_global", 0));
  Bot.setProperty("total_orders_global", gOrders + 1, "integer");

  let gSpent = parseFloat(Bot.getProperty("total_spent_global", 0));
  Bot.setProperty("total_spent_global", gSpent + amount, "float");

  // ===== SUCCESS MESSAGE =====
  let msg =
    "✅ <b>Order Placed Successfully!</b>\n\n" +
    "👤 <b>User ID:</b> " + user.telegramid + "\n" +
    "🆔 <b>Order ID:</b> " + orderId + "\n" +
    "💸 <b>Amount Deducted:</b> ₹" + amount + "\n" +
    "📊 <b>Your Total Orders:</b> " + totalOrders;

  // send to user
  Bot.sendMessage(msg, { parse_mode: "html" });

  // ===== CHANNEL LOG =====
  // Only log if admin has configured a LOG_CHANNEL bot property.
  // If not set, silently skip — no fallback channel.
  let CHANNEL_ID = Bot.getProperty("LOG_CHANNEL");

  if (CHANNEL_ID) {
    Api.sendMessage({
      chat_id: CHANNEL_ID,
      text: msg,
      parse_mode: "html",
      on_error: "channel_send_error"
    });
  }

} catch (err) {

  Bot.sendMessage(
    "❌ <b>System Error</b>\n\n" + err,
    { parse_mode: "html" }
  );

}
