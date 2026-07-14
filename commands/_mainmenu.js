/*CMD
  command: /mainmenu
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

// COMMAND: /mainmenu
/* ================================================
🌟 PREMIUM MAIN MENU SYSTEM
==================================================*/

// ===== CONFIGURATION =====
const CONFIG = {
  REFERRAL_AMOUNT: 1,
  CURRENCY: "₹",
  BOT_NAME: "⚡️ VISHAL PANEL"
}

// ===== CHECK USER STATUS =====
let userStat = User.getProperty("userStatus")
if (!userStat || userStat == "left") {
  Bot.runCommand("/start")
  return
}

// ===== REFERRAL REWARD =====
if (!User.getProperty("ReferStatus")) {
  let refUser = RefLib.getAttractedBy()
  
  if (refUser) {
    let refbal = Libs.ResourcesLib.anotherUserRes("balance", refUser.telegramid)
    refbal.add(CONFIG.REFERRAL_AMOUNT)
    
    Api.sendMessage({
      chat_id: refUser.telegramid,
      text: "╔══════════════════╗\n" +
            "   🎉 +" + CONFIG.CURRENCY + CONFIG.REFERRAL_AMOUNT + "   \n" +
            "╚══════════════════╝\n\n" +
            `From: ${user.first_name}`,
      parse_mode: "html"
    })
    
    User.setProperty("ReferStatus", true, "boolean")
  }
}

// ===== CLEANUP =====
if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id })
}

// ===== MENU =====
// ===== MENU =====
// ===== MENU =====
// ===== MENU =====
// ===== MENU =====
// ===== MENU =====
const menu = {
  keyboard: [
    [
      { text: "📦 SERVICES", style: "primary" },
      { text: "👤 PROFILE", style: "primary" }
    ],
    [
      { text: "🧾 MY ORDERS", style: "success" },
      { text: "🔍 TRACK ORDER", style: "danger" }
    ],
    [
      { text: "💳 DEPOSIT", style: "success" },
      { text: "🎉 REFER", style: "danger" }
    ],
    [
      { text: "🛟 SUPPORT", style: "primary" },
      { text: "➡️ NEXT PAGE", style: "success" }
    ]
  ],
  resize_keyboard: true
}

Api.sendMessage({
  chat_id: chat.chatid,
  text: "╔══════════════════╗\n" +
        "   ✨ MAIN MENU ✨   \n" +
        "╚══════════════════╝\n\n" +
        "⚡️ <b>Premium SMM Services</b>\n" +
        "━━━━━━━━━━━━━━━━\n" +
        "✅ Fast • Secure • 24/7\n" +
        "━━━━━━━━━━━━━━━━\n\n" +
        "👇 <b>Choose:</b>",
  parse_mode: "html",
  reply_markup: JSON.stringify(menu)
})
