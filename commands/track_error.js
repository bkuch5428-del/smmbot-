/*CMD
  command: track_error
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

// ===== COMMAND: track_error =====
/* ================================================
❌ TRACK ERROR - NORMAL VERSION
==================================================*/

// Error message
let errorMsg = 
  "╔══════════════════╗\n" +
  "   ❌ TRACK FAILED   \n" +
  "╚══════════════════╝\n\n" +

  "🔍 <b>Order could not be tracked.</b>\n" +
  "━━━━━━━━━━━━━━━━━━━\n" +
  "⚠️ Server error or invalid response.\n" +
  "━━━━━━━━━━━━━━━━━━━\n\n" +

  "👇 Try Again";

// Just send new message - no edit, no delete
Bot.sendMessage(errorMsg, { parse_mode: "html" });

// Clear properties
User.setProperty("track_msg_id", null, "integer");
User.setProperty("temp_order_id", null, "string");
