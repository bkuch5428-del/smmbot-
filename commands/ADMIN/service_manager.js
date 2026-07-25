/*CMD
  command: service_manager
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ⚙️ SERVICE MANAGER — inline callback handler
// Triggered when admin taps the "⚙️ Service Manager" button

if (request.data == "service_manager") {

  // 1️⃣ Admin check
  let adminId = Bot.getProperty("ADMIN_ID");
  if (!adminId || String(user.telegramid) != String(adminId)) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Access Denied"
    });
    return;
  }

  // 2️⃣ Service count (from saved index)
  let count = Libs.ServiceLib.getCount();

  // 3️⃣ Build sub-menu
  let panel = {
    inline_keyboard: [
      [{
        text: "🔄 Sync Services",
        callback_data: "sm_sync_services",
        style: "primary"
      }],
      [{
        text: "🔍 Search Service",
        callback_data: "sm_search_service",
        style: "primary"
      }],
      [{
        text: "📝 Service Mapping",
        callback_data: "sm_mapping",
        style: "success"
      }],
      [{
        text: "📋 View Mapping",
        callback_data: "sm_view_mapping",
        style: "primary"
      }],
      [{
        text: "⬅️ Back",
        callback_data: "backadmin",
        style: "danger"
      }]
    ]
  };

  // 4️⃣ Edit current message in-place
  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "╔════════════════════╗\n" +
      "  ⚙️ SERVICE MANAGER\n" +
      "╚════════════════════╝\n\n" +
      "📦 <b>Saved Services:</b> " + count + "\n\n" +
      "Choose option 👇",
    parse_mode: "html",
    reply_markup: JSON.stringify(panel)
  });

}
