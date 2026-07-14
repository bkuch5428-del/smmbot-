/*CMD
  command: /setapikey
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
🔑 SET API KEY
==================================================*/

// --- 1️⃣ ADMIN CHECK ---
let savedAdminId = Bot.getProperty("ADMIN_ID");

if (!savedAdminId || user.telegramid != savedAdminId) {
  Bot.sendMessage("❌ Access Denied. You are not the admin.");
  return;
}

// --- 2️⃣ SAFE PARAM FETCH ---
let apiKey = message.replace("/setapikey", "").trim();

// Check if API Key provided
if (!apiKey) {
  Bot.sendMessage(
    "❌ Please send like:\n\n/setapikey YOUR_API_KEY"
  );
  return;
}

// Clean key
apiKey = apiKey.replace(/\n/g, "").replace(/\r/g, "").trim();

// Length check
if (apiKey.length < 10) {
  Bot.sendMessage("❌ Invalid API Key");
  return;
}

// --- 3️⃣ SAVE ---
Bot.setProperty("API_KEY", apiKey, "string");

Bot.sendMessage("✅ API Key Saved Successfully");
