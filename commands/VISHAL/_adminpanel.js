/*CMD
  command: /adminpanel
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

// Command: /adminpanel
let ADMIN_ID = 6390284418;

// 1️⃣ Check if user is admin
if (chat.chatid != ADMIN_ID) {
  return Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ You are not admin"
  });
}

// 2️⃣ Create panel with only your buttons
let panel = {
  inline_keyboard: [
    [
      {
        text: "⚙️ Bot Settings",
        callback_data: "botsettings",
        style: "primary"
      },
      {
        text: "🛠 Admin Panel",
        callback_data: "adminpanel",
        style: "success"
      }
    ]
  ]
};

// 3️⃣ Send admin panel message
Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "╔════════════════════╗\n" +
    "   🛠️ ADMIN PANEL\n" +
    "╚════════════════════╝\n\n" +
    "Choose option 👇",

  parse_mode: "html",
  reply_markup: panel
});
// full credit - @Moviesmasterupdates
