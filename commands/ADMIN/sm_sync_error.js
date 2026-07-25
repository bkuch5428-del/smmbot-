/*CMD
  command: sm_sync_error
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

// ❌ SYNC SERVICES — HTTP error callback
// BB passes the error body in `content` (same pattern as track_error.js / order_error.js)

Bot.sendMessage(
  "❌ <b>Service Sync Failed</b>\n\n" +
  "📄 <b>Raw response:</b>\n<code>" + String(content).substring(0, 400) + "</code>\n\n" +
  "Common causes:\n" +
  "• Wrong API_URL — use <code>/setapiurl</code>\n" +
  "• Wrong API_KEY — use <code>/setapikey</code>\n" +
  "• Panel is offline or blocking requests\n\n" +
  "Run <code>/sm_sync</code> again after correcting the settings.",
  { parse_mode: "html" }
);
