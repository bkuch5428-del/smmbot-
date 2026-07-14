/*CMD
  command: SERVICES
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CATEGORIES

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* ================================================
📦 SERVICES MENU
================================================ */

Api.sendMessage({
  text:
  "╔════════════════════╗\n" +
  "   ⚙️ SERVICES PANEL\n" +
  "╚════════════════════╝\n\n" +
  "🚀 Select your favorite platform below:",

  parse_mode: "html",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "📷 Instagram",
          callback_data: "/cat_instagram",
          style: "danger"
        },
        {
          text: "🎬 YouTube",
          callback_data: "/cat_youtube",
          style: "primary"
        }
      ],

      [
        {
          text: "📘 Facebook",
          callback_data: "/cat_facebook",
          style: "primary"
        },
        {
          text: "✈️ Telegram",
          callback_data: "/cat_telegram",
          style: "success"
        }
      ],

      [
        {
          text: "⭐ Extra Services",
          callback_data: "/cat_extra",
          style: "success"
        }
      ]

    ]
  }
})
