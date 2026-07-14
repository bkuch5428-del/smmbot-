/*CMD
  command: /gencode
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

// --- 1. GET SAVED ADMIN ID ---
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

// --- 2. AUTHORIZATION CHECK ---
// Agar Admin ID set nahi hai, ya user match nahi karta -> BLOCK
if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Unauthorized:</b> You are not the admin.", {parse_mode: "html"});
  return;
}

// --- 3. PROCEED ---
Bot.sendMessage("💰 <b>Create Redeem Code</b>\n\nEnter the amount (₹):", {parse_mode: "html"});
Bot.runCommand("ask_redeem_amount");
