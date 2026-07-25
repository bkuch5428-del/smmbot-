/*CMD
  command: /sm_sync_error
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
// Called automatically by Bots.Business when HTTP.get fails.

let errDetail = "";
if (options && options.data) {
  errDetail = "\n\n<b>Details:</b> <code>" + String(options.data).substring(0, 200) + "</code>";
}

Bot.sendMessage(
  "❌ <b>Service Sync Failed</b>\n\n" +
  "Could not reach the API endpoint." + errDetail + "\n\n" +
  "Please verify:\n" +
  "• <code>/setapiurl</code> — is the URL correct?\n" +
  "• <code>/setapikey</code> — is the key valid?\n" +
  "• The panel is online and accessible.",
  { parse_mode: "html" }
);
