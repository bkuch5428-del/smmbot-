/*CMD
  command: 🛎 SERVICE LIST
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// COMMAND: 🛎 Service List

var msg =
"╔════════════════════╗\n"+
"      🛎 SERVICE LIST\n"+
"╚════════════════════╝\n\n"+

"📷 INSTAGRAM\n"+
"➤ Likes\n"+
"➤ Views\n"+
"➤ Followers\n"+
"➤ Repost\n"+
"➤ Comments\n\n"+

"🎬 YOUTUBE\n"+
"➤ Video Views\n"+
"➤ Subscribers\n"+
"➤ Video Likes\n\n"+

"✈️ TELEGRAM\n"+
"➤ Reactions\n"+
"➤ Post Views\n"+
"➤ Members\n\n"+

"📘 FACEBOOK\n"+
"➤ Likes\n"+
"➤ Followers\n"+
"➤ Views\n\n"+

"━━━━━━━━━━━━━━━━━━━━\n"+
"⚡ High Quality • Fast Delivery\n"+
"🛡️ Safe & Secure Services\n"+
"🚀 Instant Start Available\n"+
"━━━━━━━━━━━━━━━━━━━━\n\n"+

"💎 Choose your favorite service from the Services Menu and grow your audience like a pro!";

Bot.sendMessage(msg)
