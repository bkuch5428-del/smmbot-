/*CMD
  command: /cat_telegram
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
✈️ TELEGRAM SERVICES
================================================ */

Api.editMessageText({
  message_id: request.message.message_id,
  text:
  "╔════════════════════╗\n" +
  "   ✈️ TELEGRAM SERVICES\n" +
  "╚════════════════════╝\n\n" +
  "Select Telegram service:",
  
  parse_mode: "html",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "🔥 Reactions",
          callback_data: "/tg_reaction",
          style: "danger"
        },
        {
          text: "👁 Post Views",
          callback_data: "/tg_views",
          style: "primary"
        }
      ],

      [
        {
          text: "👥 Members",
          callback_data: "/tg_members",
          style: "success"
        }
      ],

      [
        {
          text: "⬅ Back",
          callback_data: "back"
        }
      ]

    ]
  }
})
