/*CMD
  command: /broadcast
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

/* COMMAND: /broadcast */

// --- 1. STRICT ADMIN CHECK ---
// Sirf wohi user command chala payega jo /setadminid se set kiya gaya hai.
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

// Agar Admin ID set nahi hai, ya user match nahi karta -> STOP
if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Access Denied!</b> You are not the admin.", {
    parse_mode: "html"
  });
  return;
}

// --- 2. UNIVERSAL INPUT HANDLING (Fix) ---
// Message text lene ka sabse safe tarika
let msg = null;

// Method A: 'params' variable check karein (Command ke baad ka text yahan hota hai)
if (typeof params !== 'undefined' && params) {
    msg = params;
}
// Method B: Agar params fail ho, to message.text check karein
else if (message && message.text) {
    // Regex se command (/broadcast) hata kar text nikalein
    msg = message.text.replace(/^\/broadcast\s*/i, "");
}

// Safai (Trim extra spaces)
if (msg) {
    msg = msg.trim();
}

// --- 3. VALIDATION ---
if (!msg) {
  Bot.sendMessage(
    "⚠️ <b>Usage:</b>\n\n<code>/broadcast Your message here</code>",
    { parse_mode: "html" }
  );
  return;
}

// --- 4. GET USER LIST ---
// Note: Aapka bot "broadcast_list" mein users save kar raha hona chahiye (/start command par)
let list = Bot.getProperty("broadcast_list", []);

if (!list || list.length === 0) {
  Bot.sendMessage("📭 <b>No users found in database!</b>", {
    parse_mode: "html"
  });
  return;
}

// --- 5. START BROADCAST ---
Bot.sendMessage(
  "📢 <b>Broadcast Started</b>\n\n👥 Total Users: <b>" + list.length + "</b>",
  { parse_mode: "html" }
);

// Counters
let sent = 0;
let failed = 0;

// --- 6. SEND LOOP ---
// Loop chala kar sabko message bhejein
for (let i = 0; i < list.length; i++) {
  try {
    Api.sendMessage({
      chat_id: list[i],
      text: msg,
      parse_mode: "HTML", // Broadcast message HTML support karega
      disable_web_page_preview: true
    });
    sent++;
  } catch (e) {
    failed++;
    // Agar user ne bot block kiya hoga to yahan count hoga
  }
}

// --- 7. FINAL REPORT ---
Bot.sendMessage(
  "✅ <b>Broadcast Completed!</b>\n\n" +
  "📨 Sent: <b>" + sent + "</b>\n" +
  "❌ Failed: <b>" + failed + "</b>",
  { parse_mode: "html" }
);
