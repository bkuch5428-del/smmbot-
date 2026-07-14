/*CMD
  command: view_settings
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

// COMMAND: /view_settings

// --- 1. ADMIN CHECK ---
let savedAdminId = Bot.getProperty("ADMIN_ID");
let user_id = String(user.telegramid);

// Auth Logic: केवल savedAdminId से check
if (!savedAdminId || user_id != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Access Denied:</b> You are not the admin.", {parse_mode: "html"});
  return;
}

// --- 2. READ PROPERTIES ---
let apiKey = Bot.getProperty("API_KEY");
let apiUrl = Bot.getProperty("API_URL");
let upiId = Bot.getProperty("UPI_ID");
let channelUsername = Bot.getProperty("force_channel");

// Fallback values
let displayAdmin = savedAdminId ? savedAdminId : "❌ Not Set";
let displayKey = apiKey ? apiKey : "❌ Not Set";
let displayUrl = apiUrl ? apiUrl : "❌ Not Set";
let displayUPI = upiId ? upiId : "❌ Not Set";
let displayChannel = channelUsername ? channelUsername : "❌ Not Set";

// --- 3. MASKING (Security) ---
if (displayKey !== "❌ Not Set" && displayKey.length > 8) {
  displayKey =
    displayKey.substring(0, 4) +
    "••••••••" +
    displayKey.substring(displayKey.length - 4);
}

// --- 4. SEND SETTINGS ---
let messageText =
  "📊 <b>Current Saved Settings</b>\n\n" +
  "👑 <b>Admin ID:</b>\n<code>" + displayAdmin + "</code>\n\n" +
  "🔑 <b>API Key:</b>\n<code>" + displayKey + "</code>\n\n" +
  "🌐 <b>API URL FIXED:</b>\n<code>" + displayUrl + "</code>\n\n" +
  "💳 <b>UPI ID:</b>\n<code>" + displayUPI + "</code>\n\n" +
  "📺 <b>Channel Username:</b>\n<code>" + displayChannel + "</code>";

Bot.sendMessage(messageText, { parse_mode: "html" });
