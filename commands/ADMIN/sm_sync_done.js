/*CMD
  command: sm_sync_done
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
// Triggered by HTTP.post success: "sm_sync_done" in sm_sync.js
// options.data contains the raw API response string.

// 1️⃣ Capture raw response for debugging
let rawData = options && options.data ? String(options.data) : "";
let statusCode = options && options.status ? options.status : "unknown";

// 2️⃣ Log status + raw body to admin (first 500 chars so nothing is hidden)
let debugHeader =
  "📥 <b>API Response Received</b>\n" +
  "📊 <b>Status:</b> <code>" + statusCode + "</code>\n" +
  "📄 <b>Raw (first 500 chars):</b>\n" +
  "<code>" + rawData.substring(0, 500) + "</code>\n\n";

// 3️⃣ Guard: empty response
if (!rawData || rawData.trim() === "") {
  Bot.sendMessage(
    debugHeader +
    "❌ <b>Sync Failed:</b> API returned an empty response.\n\n" +
    "Check that API_URL points to the correct endpoint.",
    { parse_mode: "html" }
  );
  return;
}

// 4️⃣ Parse JSON
let services = null;
try {
  services = JSON.parse(rawData);
} catch (e) {
  Bot.sendMessage(
    debugHeader +
    "❌ <b>Sync Failed:</b> Response is not valid JSON.\n\n" +
    "<b>Parse error:</b> <code>" + e.toString() + "</code>",
    { parse_mode: "html" }
  );
  return;
}

// 5️⃣ Panel returned an error object  { "error": "..." }
if (!Array.isArray(services)) {
  let errDetail = (services && services.error)
    ? String(services.error)
    : "Response is not an array. Got: " + JSON.stringify(services).substring(0, 200);

  Bot.sendMessage(
    debugHeader +
    "❌ <b>Sync Failed:</b>\n<code>" + errDetail + "</code>\n\n" +
    "Verify your API_KEY and API_URL are correct.",
    { parse_mode: "html" }
  );
  return;
}

// 6️⃣ Save all services via ServiceLib
let count = Libs.ServiceLib.saveAllServices(services);

// 7️⃣ Success report
Bot.sendMessage(
  "✅ <b>Services Synced Successfully!</b>\n\n" +
  "📦 <b>Total services saved:</b> " + count + "\n" +
  "📊 <b>API status:</b> " + statusCode + "\n\n" +
  "Use <b>🔍 Search Service</b> or <code>/sm_search keyword</code> to browse.\n" +
  "Use <b>📝 Service Mapping</b> or <code>/sm_mapping key serviceId</code> to map them.",
  { parse_mode: "html" }
);
