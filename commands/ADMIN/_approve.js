/*CMD
  command: /approve
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

// Command: /approve
// Usage: /approve userId amount

// --- 1. STRICT ADMIN CHECK ---
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Unauthorized:</b> You are not the admin.", {parse_mode: "html"});
  return;
}

// --- 2. INPUT HANDLING (Safe Method) ---
let args = null;

if (typeof params !== 'undefined' && params) {
    args = params;
} else if (message && message.text) {
    let splitMsg = message.text.split(" ");
    if (splitMsg.length >= 3) {
        args = splitMsg.slice(1).join(" ");
    }
}

if (!args) {
  Bot.sendMessage("❌ <b>Usage:</b> /approve userId amount\nExample: <code>/approve 123456789 100</code>", {parse_mode: "html"});
  return;
}

let parts = args.trim().split(" ");

if (parts.length < 2) {
   Bot.sendMessage("❌ <b>Usage:</b> /approve userId amount", {parse_mode: "html"});
   return;
}

let targetUserId = parts[0].trim();
let amount = parseFloat(parts[1]);

// --- 3. VALIDATION ---
if (!targetUserId || !/^\d+$/.test(targetUserId)) {
   Bot.sendMessage("❌ Error: User ID sahi nahi hai (Numbers only).");
   return;
}

if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❌ Error: Amount valid number hona chahiye.");
  return;
}

// --- 4. BALANCE ADDING LOGIC ---
let balance = Libs.ResourcesLib.anotherUserRes("balance", targetUserId);

if (balance.value() === undefined || balance.value() === null) {
  balance.set(0);
}

balance.add(amount);
let newBal = balance.value();

/* ================== 🔥 ADDED PART (ONLY THIS) ================== */
// 📊 GLOBAL TOTAL DEPOSIT UPDATE (for Statistics)
let totalDeposit = Bot.getProperty("total_deposit_global", 0);
Bot.setProperty(
  "total_deposit_global",
  totalDeposit + amount,
  "float"
);
/* ================== 🔥 ADD END ================== */

// --- 5. NOTIFICATIONS ---

Api.sendMessage({
  chat_id: targetUserId,
  text:
    "✅ *Payment Approved!*\n\n" +
    "💰 *Amount Added:* ₹" + amount + "\n" +
    "💼 *New Balance:* ₹" + newBal.toFixed(2) + "\n\n" +
    "🙏 Thank you for trusting us!",
  parse_mode: "Markdown"
});

Bot.sendMessage(
  "✅ <b>Approved Successfully!</b>\n\n" +
  "👤 User ID: <code>" + targetUserId + "</code>\n" +
  "💰 Added: ₹" + amount + "\n" +
  "📈 New Balance: ₹" + newBal.toFixed(2),
  { parse_mode: "html" }
);
