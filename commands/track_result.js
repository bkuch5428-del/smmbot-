/*CMD
  command: track_result
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===== COMMAND: track_result =====
/* ================================================
📊 TRACK RESULT - NORMAL VERSION
==================================================*/

try {

  if (!content || content.trim() === "") {
    return Bot.sendMessage(
      "╔══════════════════╗\n" +
      "   ❌ EMPTY RESPONSE   \n" +
      "╚══════════════════╝\n\n" +
      
      "⚠️ <b>Server returned empty response.</b>",
      { parse_mode: "html" }
    );
  }

  let json;

  try {
    json = JSON.parse(content);
  } catch (e) {
    return Bot.sendMessage(
      "╔══════════════════╗\n" +
      "   ❌ INVALID JSON   \n" +
      "╚══════════════════╝\n\n" +
      
      "📄 <b>Raw Response:</b>\n" +
      "<code>" + content + "</code>",
      { parse_mode: "html" }
    );
  }

  if (json.error) {
    return Bot.sendMessage(
      "╔══════════════════╗\n" +
      "   ⚠️ PANEL ERROR   \n" +
      "╚══════════════════╝\n\n" +
      
      "❌ <b>" + json.error + "</b>",
      { parse_mode: "html" }
    );
  }

  let status  = json.status || "Unknown";
  let start   = json.start_count ?? "0";
  let remains = json.remains ?? "0";
  let orderId = User.getProperty("temp_order_id") || "N/A";
  
  // Get link if available
  let link = json.link || "";

  // Status emoji mapping
  let emoji = "🔹";
  if (status == "Completed") emoji = "✅";
  else if (status == "Pending") emoji = "⏳";
  else if (status == "In progress") emoji = "🔄";
  else if (status == "Processing") emoji = "⚙️";
  else if (status == "Canceled") emoji = "🚫";
  else if (status == "Partial") emoji = "⚠️";
  else if (status == "Refunded") emoji = "💸";
  else if (status == "Waiting") emoji = "⏱️";

  // Format message
  let resultMsg = 
    "╔══════════════════╗\n" +
    "   📊 ORDER STATUS   \n" +
    "╚══════════════════╝\n\n" +
    
    "🆔 <b>Order ID:</b> <code>" + orderId + "</code>\n" +
    "━━━━━━━━━━━━━━━━━━━\n" +
    "📌 <b>Status:</b> " + emoji + " " + status + "\n" +
    "▶️ <b>Started:</b> " + start + "\n" +
    "⏳ <b>Remaining:</b> " + remains;

  // Add link if available
  if (link && link.trim() !== "") {
    resultMsg += "\n\n🔗 <b>Link:</b> <a href='" + link + "'>View</a>";
  }

  resultMsg += "\n━━━━━━━━━━━━━━━━━━━";

  // Just send new message - no edit
  Bot.sendMessage(resultMsg, { 
    parse_mode: "html",
    disable_web_page_preview: true 
  });

  // Clean up temp data
  User.setProperty("temp_order_id", null, "string");
  User.setProperty("track_msg_id", null, "integer");

} catch (err) {
  
  Bot.sendMessage(
    "╔══════════════════╗\n" +
    "   ❌ SYSTEM ERROR   \n" +
    "╚══════════════════╝\n\n" +
    
    "⚠️ <b>" + err + "</b>",
    { parse_mode: "html" }
  );
  
  User.setProperty("temp_order_id", null, "string");
  User.setProperty("track_msg_id", null, "integer");
}
