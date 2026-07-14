/*CMD
  command: botsettings
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

// Bot Settings button click handler
if (request.data == "botsettings") {

  // 1️⃣ Define Bot Settings sub-menu (vertical buttons)
  let botSettingsPanel = {
    inline_keyboard: [
      [{
        text: "📌 Set Main Channel 1",
        callback_data: "/set1",
        style: "primary"
      }],
      [{
        text: "📌 Set Premium Group 2",
        callback_data: "/set2",
        style: "success"
      }],
      [{
        text: "📌 Set Updates Channel 3",
        callback_data: "/set3",
        style: "primary"
      }],
      [{
        text: "📺 Set check Username",
        callback_data: "/setusername",
        style: "success"
      }],
      [{
        text: "⬅️ Back",
        callback_data: "backadmin",
        style: "danger"
      }]
    ]
  };

  // 2️⃣ Edit the existing message to show Bot Settings
  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text: "╔════════════════════╗\n" +
          "   ⚙️ BOT SETTINGS\n" +
          "╚════════════════════╝\n\n" +
          "Choose option 👇",
    parse_mode: "html",
    reply_markup: JSON.stringify(botSettingsPanel)
  });
}
