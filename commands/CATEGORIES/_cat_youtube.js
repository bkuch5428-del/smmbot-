/*CMD
  command: /cat_youtube
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
"   🎬 YOUTUBE SERVICES\n" +
"╚════════════════════╝\n\n" +
"Select YouTube service:",

parse_mode: "html",

reply_markup: {
inline_keyboard: [

[  
    {
      text: "👁 Video Views",
      callback_data: "/yt_views",
      style: "danger"
    },  
    {
      text: "👥 Subscribers",
      callback_data: "/yt_subs",
      style: "primary"
    }  
  ],  

  [  
    {
      text: "👍 Video Likes",
      callback_data: "/yt_likes",
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
