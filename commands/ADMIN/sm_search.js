/*CMD
  command: sm_search_service
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

// 🔍 SEARCH SERVICE — inline callback handler
// Shows the admin how to search and gives quick category/id tip.

if (request.data == "sm_search_service") {

  // Admin check
  let adminId = Bot.getProperty("ADMIN_ID");
  if (!adminId || String(user.telegramid) != String(adminId)) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Access Denied"
    });
    return;
  }

  let count = Libs.ServiceLib.getCount();

  let backPanel = {
    inline_keyboard: [
      [{
        text: "⬅️ Back to Service Manager",
        callback_data: "service_manager",
        style: "danger"
      }]
    ]
  };

  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "🔍 <b>Search Service</b>\n\n" +
      "📦 <b>Total services saved:</b> " + count + "\n\n" +
      "Send a command to search:\n\n" +
      "<code>/sm_search keyword</code>\n\n" +
      "Examples:\n" +
      "• <code>/sm_search youtube</code>\n" +
      "• <code>/sm_search instagram followers</code>\n" +
      "• <code>/sm_search 1234</code>  ← search by ID\n\n" +
      "Returns up to 10 matching services.",
    parse_mode: "html",
    reply_markup: JSON.stringify(backPanel)
  });

}
