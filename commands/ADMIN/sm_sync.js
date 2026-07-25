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
// Fetches all services from the configured SMM panel API
// and saves them to Bot Properties via ServiceLib.

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

// 3️⃣ Show "syncing…" feedback if triggered from button
if (request && request.data == "sm_sync_services") {
  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "⏳ <b>Syncing services…</b>\n\n" +
      "Fetching from API, please wait.",
    parse_mode: "html"
  });
}

// 4️⃣ Build the API endpoint: action=services
let syncUrl = apiUrl + "?action=services&key=" + apiKey;

// 5️⃣ Fire the async HTTP request
//    Results are handled by /sm_sync_done or /sm_sync_error
HTTP.get({
  url:     syncUrl,
  success: "/sm_sync_done",
  error:   "/sm_sync_error"
});
