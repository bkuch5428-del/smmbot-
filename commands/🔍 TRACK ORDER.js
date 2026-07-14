/*CMD
  command: 🔍 TRACK ORDER
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

// ===== TRACK ORDER - STEP 1: ASK FOR ID =====
if (request.text === "🔍 TRACK ORDER") {

  // Send prompt
  Bot.sendMessage(
    "╔══════════════════╗\n" +
    "   🔍 TRACK ORDER   \n" +
    "╚══════════════════╝\n\n" +
    
    "📦 <b>Send your Order ID</b>\n" +
    "━━━━━━━━━━━━━━━━━━━\n\n" +
    
    "✏️ Example: <code>123456</code>\n\n" +
    
    "👇 <b>Send now:</b>",
    { parse_mode: "html" }
  );

  // Set waiting state
  User.setProperty("awaiting_track", true, "boolean");
  
  Bot.runCommand("/track");
  return;
}
