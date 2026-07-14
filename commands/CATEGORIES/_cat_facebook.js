/*CMD
  command: /cat_facebook
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

Api.editMessageText({
  message_id: request.message.message_id,
  text:
  "╔════════════════════╗\n" +
  "   📘 FACEBOOK SERVICES\n" +
  "╚════════════════════╝\n\n" +
  "Select Facebook service:",
  
  parse_mode: "html",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "👍 Likes",
          callback_data: "/fb_likes",
          style: "primary"
        },
        {
          text: "👥 Followers",
          callback_data: "/fb_followers",
          style: "success"
        }
      ],

      [
        {
          text: "👁 Views",
          callback_data: "/fb_views",
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
