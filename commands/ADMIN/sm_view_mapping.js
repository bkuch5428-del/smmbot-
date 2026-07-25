/*CMD
  command: sm_view_mapping
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /sm_view_mapping
  group: 
CMD*/

// 📋 VIEW MAPPING
// Shows all saved key→serviceId mappings with service details.
// Works as both a callback button and a direct command.

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

// 2️⃣ Load mappings
let maps    = Libs.ServiceLib.getAllMappings();
let mapKeys = Object.keys(maps);

// 3️⃣ Build message
let text = "📋 <b>Service Mappings</b>\n\n";

if (mapKeys.length === 0) {
  text +=
    "⚠️ No mappings saved yet.\n\n" +
    "Use <code>/sm_mapping key serviceId</code> to add one.\n" +
    "Example: <code>/sm_mapping ytviews 1234</code>";
} else {
  text += "🗂 <b>Total:</b> " + mapKeys.length + " mapping(s)\n\n";

  for (let i = 0; i < mapKeys.length; i++) {
    let key = mapKeys[i];
    let sid = maps[key];

    // Try to fetch service details
    let svc = Libs.ServiceLib.getService(sid);
    let svcLine = svc
      ? "📌 " + svc.name + " | 💰 " + svc.rate + " | " + svc.category
      : "⚠️ Service not in saved list (ID: " + sid + ")";

    text +=
      "━━━━━━━━━━━━━━━━━━\n" +
      "🗝 <b>Key:</b> <code>" + key + "</code>\n" +
      "🆔 <b>Service ID:</b> <code>" + sid + "</code>\n" +
      svcLine + "\n\n";
  }

  text += "━━━━━━━━━━━━━━━━━━\n";
  text += "To remove: <code>/sm_unmap key</code>";
}

// 4️⃣ Back button (shown for callback context)
let backPanel = {
  inline_keyboard: [
    [{
      text: "⬅️ Back to Service Manager",
      callback_data: "service_manager",
      style: "danger"
    }]
  ]
};

if (request && request.data == "sm_view_mapping") {
  // Edit the existing message
  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text: text,
    parse_mode: "html",
    reply_markup: JSON.stringify(backPanel)
  });
} else {
  // Sent as direct command — send new message
  Bot.sendMessage(text, { parse_mode: "html" });
}
