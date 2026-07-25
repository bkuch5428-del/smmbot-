/*CMD
  command: /sm_sync_done
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

// ✅ SYNC SERVICES — HTTP success callback
// Called automatically by Bots.Business after HTTP.get succeeds.
// options.data contains the raw API response string.

// 1️⃣ Parse response
let rawData = options.data;
let services = null;

try {
  services = JSON.parse(rawData);
} catch (e) {
  Bot.sendMessage(
    "❌ <b>Sync Failed:</b> Invalid JSON from API.\n\n" +
    "<b>Raw response:</b>\n<code>" + String(rawData).substring(0, 300) + "</code>",
    { parse_mode: "html" }
  );
  return;
}

// 2️⃣ Validate: must be an array
if (!Array.isArray(services)) {
  // Some panels return {error: "..."} on failure
  let errDetail = (services && services.error)
    ? services.error
    : "Response is not an array of services.";

  Bot.sendMessage(
    "❌ <b>Sync Failed:</b> " + errDetail + "\n\n" +
    "Make sure API_URL and API_KEY are correct.",
    { parse_mode: "html" }
  );
  return;
}

// 3️⃣ Save all services via ServiceLib
let count = Libs.ServiceLib.saveAllServices(services);

// 4️⃣ Report result
Bot.sendMessage(
  "✅ <b>Services Synced Successfully!</b>\n\n" +
  "📦 <b>Total services saved:</b> " + count + "\n\n" +
  "Use <b>🔍 Search Service</b> or <code>/sm_search keyword</code> to browse them.\n" +
  "Use <b>📝 Service Mapping</b> or <code>/sm_mapping key serviceId</code> to map them.",
  { parse_mode: "html" }
);
