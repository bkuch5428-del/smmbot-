/*CMD
  command: /set2
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
💎 SET PREMIUM GROUP - /Set2
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
  Bot.sendMessage("❌ Usage: /set2 Premium Group link");
  return;
}

let link = parts[1];

// Save
Bot.setProperty("CHANNEL_PREMIUM", link, "string");
Bot.sendMessage(`✅ Premium Group saved:\n<code>${link}</code>`, { parse_mode: "html" });
