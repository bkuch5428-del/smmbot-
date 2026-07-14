/*CMD
  command: /reject
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

// COMMAND: /reject
// Usage: /reject userId reason text

// --- 1. STRICT ADMIN CHECK ---
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

// Agar Admin ID set nahi hai, ya current user Admin nahi hai -> BLOCK
if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Unauthorized:</b> You are not the admin.", {parse_mode: "html"});
  return;
}

// --- 2. INPUT HANDLING (Safe Method) ---
let args = null;

// Method 1: 'params' (Best for BJS - ye command ke baad ka pura text pakadta hai)
if (typeof params !== 'undefined' && params) {
    args = params;
} 
// Method 2: Fallback (Agar params fail ho)
else if (message && message.text) {
    let splitMsg = message.text.split(" ");
    if (splitMsg.length >= 3) {
        // Command hatake baaki sab le lo
        args = splitMsg.slice(1).join(" ");
    }
}

// Agar arguments nahi mile
if (!args) {
  Bot.sendMessage("❌ <b>Usage:</b> /reject userId Reason\nExample: <code>/reject 123456789 Screenshot fake hai</code>", {parse_mode: "html"});
  return;
}

// --- 3. PARSING USER ID & REASON ---
let parts = args.trim().split(" ");
let targetUserId = parts[0].trim();

// Reason nikalne ke liye: Pehla hissa (ID) hata do, baaki sab join kar do
// Example: "123 Screenshot clear nahi hai" -> "Screenshot clear nahi hai"
let reason = parts.slice(1).join(" ");

// --- 4. VALIDATION ---

// User ID Check
if (!targetUserId || !/^\d+$/.test(targetUserId)) {
   Bot.sendMessage("❌ Error: User ID sirf numbers hona chahiye.");
   return;
}

// Reason Check
if (!reason) {
  Bot.sendMessage("❌ Error: Aapne koi reason (wajah) nahi likhi.");
  return;
}

// --- 5. EXECUTION ---

// 1. User ko notify karein
Api.sendMessage({
  chat_id: targetUserId,
  text:
    "❌ *Payment Rejected!*\n\n" +
    "📌 *Reason:* " + reason + "\n\n" +
    "💬 _Agar aapko lagta hai ye galti hai, to kripya admin se contact karein._",
  parse_mode: "Markdown"
});

// 2. Admin confirm message
Bot.sendMessage(
  "✅ <b>Rejection Sent Successfully!</b>\n\n" +
  "👤 User ID: <code>" + targetUserId + "</code>\n" +
  "📝 Reason: " + reason,
  { parse_mode: "html" }
);
