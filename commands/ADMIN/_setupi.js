/*CMD
  command: /setupi
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
⚙️ ADMIN SETUP UPI
================================================ */

// Get admin ID from Bot property
let savedAdminId = Bot.getProperty("ADMIN_ID");

if (!savedAdminId || user.telegramid != savedAdminId) {
  Bot.sendMessage("❌ You are not allowed to use this command.");
  return;
}

// Get text safely
let text = request.text ? request.text : "";

// Check command usage
if (!text.startsWith("/setupi")) {
  Bot.sendMessage(
    "╔════════════════════╗\n" +
    "   ⚙️ SETUP UPI\n" +
    "╚════════════════════╝\n\n" +
    "Usage:\n" +
    "<code>/setupi yourupi@bank</code>",
    { parse_mode: "html" }
  );
  return;
}

// Extract UPI ID
let upi = text.split(" ")[1];

if (!upi) {
  Bot.sendMessage(
    "❌ Please enter UPI ID\n\nExample:\n<code>/setupi yourupi@bank</code>",
    { parse_mode: "html" }
  );
  return;
}

// Save UPI ID
Bot.setProperty("UPI_ID", upi, "string");

// Confirmation message
Bot.sendMessage(
  "╔════════════════════╗\n" +
  "   ✅ UPI SAVED\n" +
  "╚════════════════════╝\n\n" +
  "UPI ID:\n<code>" + upi + "</code>",
  { parse_mode: "html" }
);
