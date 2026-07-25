/*CMD
  command: /sm_search
  help: Search saved services by name, category, or ID
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

// 🔍 /sm_search keyword
// Searches saved services by name, category, or exact service ID.
// Usage: /sm_search youtube views

// 1️⃣ Admin check
let adminId = Bot.getProperty("ADMIN_ID");
if (!adminId || String(user.telegramid) != String(adminId)) {
  Bot.sendMessage("❌ Access Denied.");
  return;
}

// 2️⃣ Extract search query from message
let query = "";
if (typeof params !== "undefined" && params) {
  query = params.trim();
} else if (message) {
  query = message.replace("/sm_search", "").trim();
}

if (!query) {
  Bot.sendMessage(
    "❌ Please provide a search term.\n\n" +
    "Usage: <code>/sm_search keyword</code>\n" +
    "Example: <code>/sm_search youtube views</code>",
    { parse_mode: "html" }
  );
  return;
}

// 3️⃣ Check if any services are saved
let totalCount = Libs.ServiceLib.getCount();
if (totalCount === 0) {
  Bot.sendMessage(
    "⚠️ <b>No services saved yet.</b>\n\n" +
    "Run <b>🔄 Sync Services</b> first from the Service Manager.",
    { parse_mode: "html" }
  );
  return;
}

// 4️⃣ Search
let results = Libs.ServiceLib.searchServices(query, 10);

if (!results || results.length === 0) {
  Bot.sendMessage(
    "🔍 <b>No results for:</b> <i>" + query + "</i>\n\n" +
    "Try a different keyword or check the service ID.",
    { parse_mode: "html" }
  );
  return;
}

// 5️⃣ Format results
let text =
  "🔍 <b>Search Results for:</b> <i>" + query + "</i>\n" +
  "📦 Found: " + results.length + " service(s)\n\n";

for (let i = 0; i < results.length; i++) {
  let svc = results[i];
  text +=
    "━━━━━━━━━━━━━━━━━━\n" +
    "🆔 <b>ID:</b> <code>" + svc.id + "</code>\n" +
    "📌 <b>Name:</b> " + svc.name + "\n" +
    "📂 <b>Category:</b> " + svc.category + "\n" +
    "💰 <b>Rate:</b> " + svc.rate + "\n" +
    "📉 <b>Min:</b> " + svc.min + "  |  📈 <b>Max:</b> " + svc.max + "\n" +
    "🔖 <b>Type:</b> " + svc.type + "\n\n";
}

text += "━━━━━━━━━━━━━━━━━━\n";
text += "To map a service: <code>/sm_mapping key " + results[0].id + "</code>";

Bot.sendMessage(text, { parse_mode: "html" });
