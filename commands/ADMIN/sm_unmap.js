/*CMD
  command: /sm_unmap
  help: Remove a service mapping by key
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

// 🗑 REMOVE MAPPING
// Usage: /sm_unmap key
// Example: /sm_unmap ytviews

// 1️⃣ Admin check
let adminId = Bot.getProperty("ADMIN_ID");
if (!adminId || String(user.telegramid) != String(adminId)) {
  Bot.sendMessage("❌ Access Denied.");
  return;
}

// 2️⃣ Extract key
let mapKey = "";
if (typeof params !== "undefined" && params) {
  mapKey = params.trim().toLowerCase();
} else if (message) {
  mapKey = message.replace("/sm_unmap", "").trim().toLowerCase();
}

if (!mapKey) {
  Bot.sendMessage(
    "❌ Provide the mapping key to remove.\n\n" +
    "Usage: <code>/sm_unmap key</code>\n" +
    "Example: <code>/sm_unmap ytviews</code>",
    { parse_mode: "html" }
  );
  return;
}

// 3️⃣ Check mapping exists
let existing = Libs.ServiceLib.getMapping(mapKey);
if (!existing) {
  Bot.sendMessage(
    "⚠️ No mapping found for key: <code>" + mapKey + "</code>",
    { parse_mode: "html" }
  );
  return;
}

// 4️⃣ Remove it
Libs.ServiceLib.removeMapping(mapKey);

Bot.sendMessage(
  "✅ Mapping removed.\n\n" +
  "🗝 Key <code>" + mapKey + "</code> → Service ID <code>" + existing + "</code> deleted.",
  { parse_mode: "html" }
);
