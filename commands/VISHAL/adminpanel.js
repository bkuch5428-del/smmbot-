/*CMD
  command: adminpanel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: VISHAL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /admin
// full credit - @VishalCodeVerse
let ADMIN_ID = Bot.getProperty("ADMIN_ID");

// 1️⃣ Check admin
if (!ADMIN_ID || String(chat.chatid) != String(ADMIN_ID)) {
  return Bot.sendMessage("❌ You are not admin");
}

// 2️⃣ Full admin panel
let mainPanel = {
  inline_keyboard: [
    [
      {
        text: "➕ Add Balance",
        callback_data: "/approve",
        style: "success"
      },
      {
        text: "➖ Cut Balance",
        callback_data: "/cut",
        style: "danger"
      }
    ],
    [
      {
        text: "👥 All Users",
        callback_data: "AA",
        style: "primary"
      }
    ],
    [
      {
        text: "📢 Broadcast",
        callback_data: "/broadcast",
        style: "primary"
      }
    ],
    [
      {
        text: "🎟 Generate Code",
        callback_data: "/gencode",
        style: "success"
      }
    ],
    [
      {
        text: "🔑 Change API Key",
        callback_data: "/setapikey",
        style: "danger"
      }
    ],
    [
      {
        text: "👑 Change Admin ID",
        callback_data: "/setadminid",
        style: "primary"
      }
    ],
    [
      {
        text: "👁 View API / Admin Info",
        callback_data: "view_settings",
        style: "primary"
      }
    ],
    [
      {
        text: "⬅️ Back",
        callback_data: "back_to_admin",
        style: "danger"
      }
    ]
  ]
};

// 3️⃣ Handle button clicks
if (request.data) {

  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "╔════════════════════╗\n" +
      "   🛠️ ADMIN PANEL\n" +
      "╚════════════════════╝\n\n" +
      "Choose option 👇",

    parse_mode: "html",
    reply_markup: JSON.stringify(mainPanel)
  });

}
