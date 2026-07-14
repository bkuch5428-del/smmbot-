/*CMD
  command: /set1
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* ================================================
📱 SET MAIN CHANNEL - /Set1
==================================================*/

// Admin check
let ADMIN_ID = Bot.getProperty("ADMIN_ID");
if (!ADMIN_ID || user.telegramid != ADMIN_ID) {
  Bot.sendMessage("❌ You are not allowed to access this.");
  return;
}

// Get command text
let text = request.text ? request.text.trim() : "";

// Check if link is provided
let parts = text.split(" ");
if (parts.length < 2) {
  Bot.sendMessage("❌ Usage: /set1 Main Channel link");
  return;
}

let link = parts[1];

// Save
Bot.setProperty("CHANNEL_MAIN", link, "string");
Bot.sendMessage(`✅ Main Channel saved:\n<code>${link}</code>`, { parse_mode: "html" });
