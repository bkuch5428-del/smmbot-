/*CMD
  command: sm_mapping
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /sm_mapping
  group: 
CMD*/

// 📝 SERVICE MAPPING
// Map an internal key (e.g. "ytviews") to an API service ID.
// This prepares the groundwork for linking bot commands to panel services.
//
// As a CALLBACK (request.data == "sm_mapping"): shows instructions menu.
// As a COMMAND (/sm_mapping key serviceId):      saves the mapping.

let adminId = Bot.getProperty("ADMIN_ID");
if (!adminId || String(user.telegramid) != String(adminId)) {
  if (request && request.data) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Access Denied"
    });
  } else {
    Bot.sendMessage("❌ Access Denied.");
  }
  return;
}

// ── CALLBACK: show mapping instructions ──────────────────────────
if (request && request.data == "sm_mapping") {

  let total   = Libs.ServiceLib.getCount();
  let maps    = Libs.ServiceLib.getAllMappings();
  let mapKeys = Object.keys(maps);

  let backPanel = {
    inline_keyboard: [
      [{
        text: "📋 View Mapping",
        callback_data: "sm_view_mapping",
        style: "primary"
      }],
      [{
        text: "⬅️ Back to Service Manager",
        callback_data: "service_manager",
        style: "danger"
      }]
    ]
  };

  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "📝 <b>Service Mapping</b>\n\n" +
      "📦 <b>Saved services:</b> " + total + "\n" +
      "🗂 <b>Active mappings:</b> " + mapKeys.length + "\n\n" +
      "<b>How to map a service:</b>\n" +
      "<code>/sm_mapping key serviceId</code>\n\n" +
      "<b>Examples:</b>\n" +
      "• <code>/sm_mapping ytviews 1234</code>\n" +
      "• <code>/sm_mapping igsubs 5678</code>\n" +
      "• <code>/sm_mapping tgmembers 91</code>\n\n" +
      "<b>To remove a mapping:</b>\n" +
      "<code>/sm_unmap key</code>\n\n" +
      "Use 🔍 Search Service to find the right service ID first.",
    parse_mode: "html",
    reply_markup: JSON.stringify(backPanel)
  });

  return;
}

// ── COMMAND: /sm_mapping key serviceId ───────────────────────────
let args = "";
if (typeof params !== "undefined" && params) {
  args = params.trim();
} else if (message) {
  args = message.replace("/sm_mapping", "").trim();
}

if (!args) {
  Bot.sendMessage(
    "📝 <b>Service Mapping</b>\n\n" +
    "Usage: <code>/sm_mapping key serviceId</code>\n\n" +
    "Example:\n<code>/sm_mapping ytviews 1234</code>",
    { parse_mode: "html" }
  );
  return;
}

let parts = args.split(" ");
if (parts.length < 2) {
  Bot.sendMessage(
    "❌ Provide both key and serviceId.\n\n" +
    "Usage: <code>/sm_mapping key serviceId</code>",
    { parse_mode: "html" }
  );
  return;
}

let mapKey    = parts[0].trim().toLowerCase();
let serviceId = parts[1].trim();

// Validate that serviceId exists in saved services (optional but helpful)
let svc = Libs.ServiceLib.getService(serviceId);
let svcInfo = "";
if (svc) {
  svcInfo =
    "\n\n📌 <b>Service Details:</b>\n" +
    "• Name: " + svc.name + "\n" +
    "• Category: " + svc.category + "\n" +
    "• Rate: " + svc.rate + "\n" +
    "• Min/Max: " + svc.min + " / " + svc.max;
} else {
  svcInfo = "\n\n⚠️ Service ID <code>" + serviceId + "</code> not found in saved services. Mapping saved anyway.";
}

// Save the mapping
Libs.ServiceLib.setMapping(mapKey, serviceId);

Bot.sendMessage(
  "✅ <b>Mapping Saved!</b>\n\n" +
  "🗝 <b>Key:</b> <code>" + mapKey + "</code>\n" +
  "🆔 <b>Service ID:</b> <code>" + serviceId + "</code>" +
  svcInfo,
  { parse_mode: "html" }
);
