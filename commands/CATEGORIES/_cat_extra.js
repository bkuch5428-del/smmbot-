/*CMD
  command: /cat_extra
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
📘 SERVICES
================================================ */

Api.editMessageText({
message_id: request.message.message_id,
text:
"╔════════════════════╗\n" +
"   ⭐ EXTRA SERVICE\n" +
"╚════════════════════╝\n\n" +
"Select Best service:",

parse_mode: "html",

reply_markup: {
inline_keyboard: [

[  
    {
      text: "📸 Instagram HQ Followers",
      callback_data: "/ig_hq_followers",
      style: "danger"
    }  
  ],  

  [  
    {
      text: "🇮🇳 Instagram Indian Followers",
      callback_data: "/ig_indian_followers",
      style: "primary"
    }  
  ],  

  [  
    {
      text: "📢 Telegram Non Drop Members",
      callback_data: "/tg_non_drop_members",
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
