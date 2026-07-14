/*CMD
  command: /track
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===== TRACK ORDER - STEP 2: PROCESS ID =====
if (User.getProperty("awaiting_track") && request.text) {
  
  try {
    
    /* ========= GET ORDER ID ========= */
    let inputId = request.text.trim();

    if (!inputId) {
      Bot.sendMessage("❌ Please send your Order ID.");
      return;
    }

    if (!/^\d+$/.test(inputId)) {
      Bot.sendMessage("❌ Only numbers are allowed. Send correct ID.");
      return;
    }

    /* ========= VERIFY USER ORDER ========= */
    let myOrders = User.getProperty("my_orders", []);

    if (!Array.isArray(myOrders) || myOrders.length === 0) {
      User.setProperty("awaiting_track", false, "boolean");
      Bot.sendMessage("📭 You haven't placed any orders yet.");
      return;
    }

    let isMyOrder = false;
    for (let i = 0; i < myOrders.length; i++) {
      if (String(myOrders[i]) === inputId) {
        isMyOrder = true;
        break;
      }
    }

    if (!isMyOrder) {
      User.setProperty("awaiting_track", false, "boolean");
      Bot.sendMessage("🚫 This order is not linked to your account.");
      return;
    }

    /* ========= API CHECK ========= */
    let api_key = Bot.getProperty("API_KEY");
    let api_url = Bot.getProperty("API_URL");

    if (!api_key || !api_url) {
      User.setProperty("awaiting_track", false, "boolean");
      Bot.sendMessage("🔧 System temporarily unavailable. Try again later.");
      return;
    }

    /* ========= SAVE TEMP ========= */
    User.setProperty("temp_order_id", inputId, "string");
    User.setProperty("awaiting_track", false, "boolean");

    /* ========= LOADING MESSAGE ========= */
    Bot.sendMessage(
      "╔══════════════════╗\n" +
      "   ⏳ TRACKING   \n" +
      "╚══════════════════╝\n\n" +
      
      "🆔 <b>Order ID:</b> <code>" + inputId + "</code>\n" +
      "━━━━━━━━━━━━━━━━━━━\n\n" +
      
      "⏱ Checking status...",
      { parse_mode: "html" }
    );

    /* ========= API REQUEST ========= */
    HTTP.post({
      url: api_url,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "key=" + encodeURIComponent(api_key) + "&action=status&order=" + inputId,
      success: "track_result",
      error: "track_error"
    });

  } catch (e) {
    User.setProperty("awaiting_track", false, "boolean");
    Bot.sendMessage("❌ Error: " + e.toString());
  }
}
