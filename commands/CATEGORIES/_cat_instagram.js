/*CMD
  command: /cat_instagram
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
📷 INSTAGRAM SERVICES
================================================ */

Api.editMessageText({
  message_id: request.message.message_id,
  text:
  "╔════════════════════╗\n" +
  "   📷 INSTAGRAM SERVICES\n" +
  "╚════════════════════╝\n\n" +
  "Select Instagram service:",
  
  parse_mode: "html",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "❤️ Likes",
          callback_data: "/insta_like",
          style: "danger"
        },
        {
          text: "👁 Views",
          callback_data: "/insta_views",
          style: "primary"
        }
      ],

      [
        {
          text: "👥 Followers",
          callback_data: "/insta_followers",
          style: "success"
        },
        {
          text: "🔁 Repost",
          callback_data: "/insta_repost",
          style: "primary"
        }
      ],

      [
        {
          text: "💬 Comments",
          callback_data: "/insta_comment",
          style: "danger"
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
