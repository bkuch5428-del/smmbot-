/*CMD
  command: /cut
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

// COMMAND: /cut
// Usage: /cut userId amount

// --- 1. STRICT ADMIN CHECK ---
// Sirf saved ADMIN_ID hi allow hoga. Koi backup ID nahi.
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

// Agar Admin ID set nahi hai, ya current user Admin nahi hai
if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Unauthorized:</b> You are not the admin.", {parse_mode: "html"});
  return;
}

// --- 2. INPUT HANDLING (Smart Way) ---
// Arguments nikaalne ka tareeka
let args = null;

if (typeof params !== 'undefined' && params) {
    // Agar params available hai (Best method)
    args = params;
} else if (message && message.text) {
    // Fallback logic
    let splitMsg = message.text.split(" ");
    if (splitMsg.length >= 3) {
        args = splitMsg.slice(1).join(" ");
    }
}

// Agar arguments nahi mile
if (!args) {
  Bot.sendMessage("❌ <b>Usage:</b> /cut userId amount\nExample: <code>/cut 123456789 50</code>", {parse_mode: "html"});
  return;
}

let parts = args.trim().split(" ");

// Check karein ki dono cheezein (ID aur Amount) mojood hain
if (parts.length < 2) {
   Bot.sendMessage("❌ <b>Usage:</b> /cut userId amount", {parse_mode: "html"});
   return;
}

let targetUserId = parts[0].trim();
let amount = parseFloat(parts[1]);

// --- 3. VALIDATION ---

// User ID check (Numbers only)
if (!targetUserId || !/^\d+$/.test(targetUserId)) {
   Bot.sendMessage("❌ Error: Invalid User ID.");
   return;
}

// Amount check
if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❌ Error: Amount sahi nahi hai.");
  return;
}

// --- 4. BALANCE CUTTING LOGIC ---

// Target user ka balance resource
let balance = Libs.ResourcesLib.anotherUserRes("balance", targetUserId);

// Safety init
if (balance.value() === undefined || balance.value() === null) {
  balance.set(0);
}

let oldBal = balance.value();

// Check if sufficient balance
if (oldBal < amount) {
  Bot.sendMessage(
    "❌ <b>Insufficient User Balance!</b>\n\n" +
    "👤 User: " + targetUserId + "\n" +
    "💼 Wallet: ₹" + oldBal.toFixed(2) + "\n" +
    "➖ Try to cut: ₹" + amount,
    {parse_mode: "html"}
  );
  return;
}

// Paisa kaato
balance.remove(amount);
let newBal = balance.value();

// --- 5. NOTIFICATIONS ---

// Admin ko confirm karo
Bot.sendMessage(
  "✅ <b>Balance Deducted Successfully!</b>\n\n" +
  "👤 User ID: <code>" + targetUserId + "</code>\n" +
  "➖ Amount: ₹" + amount + "\n" +
  "📉 New Balance: ₹" + newBal.toFixed(2),
  {parse_mode: "html"}
);

// User ko message bhejo (Try-Catch taaki agar user ne block kiya ho to error na aaye)
// Note: Api.sendMessage use kar rahe hain direct targeting ke liye
Api.sendMessage({
  chat_id: targetUserId,
  text:
    "⚠️ *Admin deducted balance!*\n\n" +
    "➖ Amount: ₹" + amount + "\n" +
    "💰 Remaining Balance: ₹" + newBal.toFixed(2),
  parse_mode: "Markdown"
});
