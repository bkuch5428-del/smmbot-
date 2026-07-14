/*CMD
  command: confirm_order_tg_members
  help: 
  need_reply: false
  auto_retry_time: 
  folder: EXTRA SERVICE 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CALLBACK: confirm_order
if (request.data == "confirm_order_tg_members") {

  /* ===============================
     1️⃣ API SETTINGS
  =============================== */

  let api_key = Bot.getProperty("API_KEY");
  let api_url = Bot.getProperty("API_URL");

  if (!api_key || !api_url) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ System Maintenance — API Not Configured",
      show_alert: true
    });
    return;
  }

  /* ===============================
     2️⃣ USER DATA
  =============================== */

  let qty = parseInt(User.getProperty("order_qty"));
  let link = User.getProperty("order_link");

  if (!qty || !link) {
    Api.editMessageText({
      chat_id: chat.chatid,
      message_id: request.message.message_id,
      text: "❌ Order data missing. Please try again.",
      parse_mode: "Markdown"
    });
    return;
  }

  let balance = Libs.ResourcesLib.userRes("balance");

  /* ===============================
     3️⃣ SERVICE DETAILS
  =============================== */

  let service_id = "969";
  let price_per_1k = 110;

  /* ===============================
     4️⃣ CALCULATE COST
  =============================== */

  let total_cost = (qty / 1000) * price_per_1k;
  total_cost = parseFloat(total_cost.toFixed(2));

  /* ===============================
     5️⃣ BALANCE CHECK
  =============================== */

  if (balance.value() < total_cost) {
    return Api.editMessageText({
      chat_id: chat.chatid,
      message_id: request.message.message_id,
      text:
        "❌ *Insufficient Balance*\n\n" +
        "💼 Balance: ₹" + balance.value().toFixed(2) + "\n" +
        "💰 Required: ₹" + total_cost + "\n\nDeposit and try again.",
      parse_mode: "Markdown"
    });
  }

  /* ===============================
     6️⃣ SAVE PENDING AMOUNT
  =============================== */

  User.setProperty("pending_amount", total_cost, "float");

  /* ===============================
     7️⃣ LOADING MESSAGE
  =============================== */

  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text: "⏳ *Placing Order...*\nConnecting to server...",
    parse_mode: "Markdown"
  });

  /* ===============================
     8️⃣ SEND ORDER REQUEST
  =============================== */

  HTTP.post({
    url: api_url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      "key=" + api_key +
      "&action=add" +
      "&service=" + service_id +
      "&link=" + encodeURIComponent(link) +
      "&quantity=" + qty,

    success: "order_success",
    error: "order_error"
  });
}
