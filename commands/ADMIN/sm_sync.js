/*CMD
  command: sm_sync_services
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /sm_sync
  group: 
CMD*/

// 🔄 SYNC SERVICES
// Fetches all services from the SMM panel API using HTTP.post
// (same method used by all order/track commands in this bot).

// 1️⃣ Admin check
let adminId = Bot.getProperty("ADMIN_ID");
if (!adminId || String(user.telegramid) != String(adminId)) {
  if (request && request.data) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Access Denied"
    });
  } else {
    Bot.sendMessage("❌ Access Denied.");
  }
  return;
}

// 2️⃣ Get stored credentials
let apiUrl = Bot.getProperty("API_URL");
let apiKey = Bot.getProperty("API_KEY");

if (!apiUrl || !apiKey) {
  let errMsg =
    "❌ <b>API not configured.</b>\n\n" +
    "Please set your credentials first:\n" +
    "• <code>/setapiurl https://yourpanel.com/api</code>\n" +
    "• <code>/setapikey YOUR_API_KEY</code>";

  if (request && request.data) {
    Api.editMessageText({
      chat_id: chat.chatid,
      message_id: request.message.message_id,
      text: errMsg,
      parse_mode: "html"
    });
  } else {
    Bot.sendMessage(errMsg, { parse_mode: "html" });
  }
  return;
}

// 3️⃣ Show "syncing…" feedback and log debug info
let maskedKey = apiKey.length > 8
  ? apiKey.substring(0, 4) + "••••••••" + apiKey.substring(apiKey.length - 4)
  : "••••••••";

let debugMsg =
  "⏳ <b>Syncing services…</b>\n\n" +
  "🌐 <b>URL:</b> <code>" + apiUrl + "</code>\n" +
  "🔑 <b>Key:</b> <code>" + maskedKey + "</code>\n" +
  "📤 <b>Body:</b> <code>key=***&action=services</code>\n\n" +
  "Waiting for API response…";

if (request && request.data == "sm_sync_services") {
  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text: debugMsg,
    parse_mode: "html"
  });
} else {
  Bot.sendMessage(debugMsg, { parse_mode: "html" });
}

// 4️⃣ Build form-encoded body (same pattern as order/track commands)
//    SMM panel APIs require POST with application/x-www-form-urlencoded
let requestBody = "key=" + apiKey + "&action=services";

// 5️⃣ Fire the HTTP POST request
//    Callback names must be bare command names WITHOUT "/" prefix —
//    this matches the existing pattern: success:"order_success", error:"order_error"
HTTP.post({
  url: apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: requestBody,
  success: "sm_sync_done",
  error:   "sm_sync_error"
});
