/*CMD
  command: /setadminid
  help: 
  need_reply: false
  auto_retry_time: 
  folder: VISHAL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// COMMAND: /setadminid

// --- SECURITY CHECK ---
let currentAdmin = Bot.getProperty("ADMIN_ID");
let user_id = String(user.telegramid);

// Agar Admin ID pehle se set hai, to sirf current admin hi badal sakta hai.
// Agar set nahi hai, koi bhi pehli baar set kar sakta hai (bootstrap).
if (currentAdmin && user_id != String(currentAdmin)) {
  Bot.sendMessage("❌ Aapko permission nahi hai.");
  return;
}

// --- INPUT LENAY KA NAYA TARIKA ---
let newID = null;

// Method 1: 'params' variable check karein (Standard BJS)
if (typeof params !== 'undefined' && params) {
    newID = params;
}

// Method 2: Agar params khali hai, to message text se nikalein
if (!newID && message && message.text) {
    let parts = message.text.split(" ");
    if (parts.length >= 2) {
        newID = parts[1];
    }
}

// Method 3: 'request' object check karein (Advanced)
if (!newID && request && request.text) {
    let parts = request.text.split(" ");
    if (parts.length >= 2) {
        newID = parts[1];
    }
}

// --- FINAL CHECKS ---

// Agar abhi bhi ID nahi mili
if (!newID) {
    Bot.sendMessage("❌ <b>Galti:</b> ID nahi mili.\n\n✅ Aise likhein:\n<code>/setadminid 7322863818</code>", {parse_mode: "html"});
    return;
}

// Extra spaces hatayein
newID = newID.trim();

// Check karein ki sirf numbers hain
if (!/^\d+$/.test(newID)) {
    Bot.sendMessage("❌ Error: ID mein sirf numbers hone chahiye.");
    return;
}

// --- SAVE KAREIN ---
Bot.setProperty("ADMIN_ID", newID, "string");

Bot.sendMessage(
    "✅ <b>Admin ID Updated!</b>\n\n" +
    "👤 New Admin: <code>" + newID + "</code>",
    { parse_mode: "html" }
);
