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
// Triggered by HTTP.post error: "sm_sync_error" in sm_sync.js
// options.data contains the raw error body (if any).

let statusCode = options && options.status ? options.status : "unknown";
let rawBody    = options && options.data   ? String(options.data)   : "(no body)";

Bot.sendMessage(
  "❌ <b>Service Sync Failed</b>\n\n" +
  "📊 <b>HTTP Status:</b> <code>" + statusCode + "</code>\n" +
  "📄 <b>Raw response:</b>\n<code>" + rawBody.substring(0, 400) + "</code>\n\n" +
  "Common causes:\n" +
  "• Wrong API_URL — use <code>/setapiurl</code>\n" +
  "• Wrong API_KEY — use <code>/setapikey</code>\n" +
  "• Panel is offline or blocking requests\n\n" +
  "Run <code>/sm_sync</code> again after correcting the settings.",
  { parse_mode: "html" }
);
