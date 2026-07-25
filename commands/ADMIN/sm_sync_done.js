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
// BB passes the response body in `content` (same as order_success.js / track_result.js)

try {

  // 1️⃣ Log raw response so nothing is hidden
  Bot.sendMessage(
    "📥 <b>API response received</b>\n" +
    "📄 <b>Raw (first 500 chars):</b>\n" +
    "<code>" + String(content).substring(0, 500) + "</code>",
    { parse_mode: "html" }
  );

  // 2️⃣ Guard: empty response
  if (!content || content.trim() === "") {
    Bot.sendMessage(
      "❌ <b>Sync Failed:</b> API returned an empty response.\n\n" +
      "Check that API_URL points to the correct endpoint.",
      { parse_mode: "html" }
    );
    return;
  }

  // 3️⃣ Parse JSON
  let services;
  try {
    services = JSON.parse(content);
  } catch (e) {
    Bot.sendMessage(
      "❌ <b>Sync Failed:</b> Response is not valid JSON.\n\n" +
      "<b>Parse error:</b> <code>" + e.toString() + "</code>",
      { parse_mode: "html" }
    );
    return;
  }

  // 4️⃣ Panel returned an error object  { "error": "..." }
  if (!Array.isArray(services)) {
    let errDetail = (services && services.error)
      ? String(services.error)
      : "Response is not an array. Got: " + JSON.stringify(services).substring(0, 200);

    Bot.sendMessage(
      "❌ <b>Sync Failed:</b>\n<code>" + errDetail + "</code>\n\n" +
      "Verify your API_KEY and API_URL are correct.",
      { parse_mode: "html" }
    );
    return;
  }

  // 5️⃣ Save all services via ServiceLib
  let count = Libs.ServiceLib.saveAllServices(services);

  // 6️⃣ Success report
  Bot.sendMessage(
    "✅ <b>Services Synced Successfully!</b>\n\n" +
    "📦 <b>Total services saved:</b> " + count + "\n\n" +
    "Use <b>🔍 Search Service</b> or <code>/sm_search keyword</code> to browse.\n" +
    "Use <b>📝 Service Mapping</b> or <code>/sm_mapping key serviceId</code> to map them.",
    { parse_mode: "html" }
  );

} catch (err) {
  Bot.sendMessage(
    "❌ <b>Sync Callback Error:</b>\n<code>" + err.toString() + "</code>",
    { parse_mode: "html" }
  );
}
