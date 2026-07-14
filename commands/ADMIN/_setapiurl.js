/*CMD
  command: /setapiurl
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
🌐 SET API URL
==================================================*/

// --- 1️⃣ ADMIN CHECK ---
let savedAdminId = Bot.getProperty("ADMIN_ID");

if (!savedAdminId || user.telegramid != savedAdminId) {
  Bot.sendMessage("❌ <b>Access Denied:</b> You are not the admin.", { parse_mode: "html" });
  return;
}

// --- 2️⃣ INPUT EXTRACTION ---
let apiUrl = null;

// Method 1: 'params' variable check
if (typeof params !== 'undefined' && params) {
    apiUrl = params;
}

// Method 2: Fallback from message text
if (!apiUrl && message && message.text) {
    let parts = message.text.split(" ");
    if (parts.length >= 2) {
        apiUrl = parts.slice(1).join(" ");
    }
}

// --- 3️⃣ VALIDATION ---
if (!apiUrl) {
    Bot.sendMessage(
      "❌ <b>Error:</b> URL not provided.\n\n✅ Example:\n<code>/setapiurl https://example.com/api</code>",
      { parse_mode: "html" }
    );
    return;
}

apiUrl = apiUrl.trim();

// Basic check for http/https
if (!/^https?:\/\/.+/i.test(apiUrl)) {
    Bot.sendMessage(
      "❌ Invalid URL. It must start with <b>http://</b> or <b>https://</b>.",
      { parse_mode: "html" }
    );
    return;
}

// Remove trailing slash
if (apiUrl.endsWith("/")) {
    apiUrl = apiUrl.slice(0, -1);
}

// --- 4️⃣ SAVE ---
Bot.setProperty("API_URL", apiUrl, "string");

Bot.sendMessage(
  "✅ <b>API URL Updated Successfully!</b>\n\n" +
  "🌐 <b>URL:</b> <code>" + apiUrl + "</code>",
  { parse_mode: "html" }
);
