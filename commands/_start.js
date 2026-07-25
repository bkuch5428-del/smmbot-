/*CMD
  command: /start
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

/* ================================================
⚡️ ADVANCED FORCE JOIN SYSTEM - START
==================================================*/

// ===== GET CHANNELS FROM PROPERTIES =====
var channelMain = Bot.getProperty("CHANNEL_MAIN");
var channelPremium = Bot.getProperty("CHANNEL_PREMIUM");
var channelUpdates = Bot.getProperty("CHANNEL_UPDATES");

// Check if at least one channel is set
var channelsSet = [];
if (channelMain) channelsSet.push({ name: "Main Channel", url: channelMain, emoji: "📱" });
if (channelPremium) channelsSet.push({ name: "Premium Group", url: channelPremium, emoji: "💎" });
if (channelUpdates) channelsSet.push({ name: "Updates", url: channelUpdates, emoji: "📢" });

// ===== CHECK IF ALREADY ATTRACTED (REFERRAL) =====
if (User.getProperty("referbonus")) {

  Bot.sendMessage(
    "┏━━━━━━━━━━━━━━━━━━━┓\n" +
    "   ✨ WELCOME BACK\n" +
    "┗━━━━━━━━━━━━━━━━━━━┛\n\n" +

    "🚀 Your account is verified.\n" +
    "📌 Use /menu to continue.",
    { parse_mode: "html" }
  )

  return
}

// ===== FORCE JOIN MENU =====
var keyboard = [];

if (channelsSet.length > 0) {

  for (var i = 0; i < channelsSet.length; i++) {
    var ch = channelsSet[i];
    keyboard.push([{
      text: ch.emoji + " " + ch.name,
      url: ch.url,
      style: "primary"
    }]);
  }

} else {

  Bot.sendMessage("⚠️ Admin has not set channels yet!");

}

// ===== VERIFY BUTTON =====
keyboard.push([{
  text: "✅ VERIFY JOIN",
  callback_data: "/joined",
  style: "success"
}]);

// ===== MAIN MESSAGE =====
var channelNames = "";
if (channelsSet.length > 0) {
  var channelNameArr = [];
  for (var j = 0; j < channelsSet.length; j++) {
    channelNameArr.push(channelsSet[j].emoji + " " + channelsSet[j].name);
  }
  channelNames = channelNameArr.join("\n");
} else {
  channelNames = "⏳ Waiting for admin setup";
}

Api.sendMessage({
  text:
    "┏━━━━━━━━━━━━━━━━━━━┓\n" +
    "   🔒 JOIN CHANNELS\n" +
    "┗━━━━━━━━━━━━━━━━━━━┛\n\n" +

    channelNames +

    "\n\n✨ Complete all joins first\n" +
    "⚡ Then click VERIFY JOIN",

  parse_mode: "html",
  reply_markup: {
    inline_keyboard: keyboard
  }
})

// ===== SAVE USER DATA =====
if (user.username) {
  Bot.setProperty("user_" + user.telegramid, user.username, "string")
}

// ===== USER LIST =====
var userList = Bot.getProperty("userlist", [])
var userExists = false;
for (var k = 0; k < userList.length; k++) {
  if (userList[k] === user.telegramid) {
    userExists = true;
    break;
  }
}
if (!userExists) {
  userList.push(user.telegramid)
  Bot.setProperty("userlist", userList, "json")
}

// ===== API URL CHECK =====
// Never write API_URL here — admin must set it via /setapiurl.
// If it is missing, alert the admin so they know to configure it.
if (!Bot.getProperty("API_URL")) {
  var _warnAdminId = Bot.getProperty("ADMIN_ID");
  if (_warnAdminId) {
    Api.sendMessage({
      chat_id: _warnAdminId,
      text:
        "⚠️ <b>Admin Warning</b>\n\n" +
        "API_URL is not configured.\n" +
        "Please run /setapiurl to set the SMM panel API URL.\n\n" +
        "Example: <code>/setapiurl https://vcprovider.shop/api/v2</code>",
      parse_mode: "html"
    });
  }
}

// ===== BROADCAST LIST =====
var broadcastUsers = Bot.getProperty("broadcast_list", [])
var broadcastExists = false;
for (var l = 0; l < broadcastUsers.length; l++) {
  if (broadcastUsers[l] === user.telegramid) {
    broadcastExists = true;
    break;
  }
}
if (!broadcastExists) {
  broadcastUsers.push(user.telegramid)
  Bot.setProperty("broadcast_list", broadcastUsers, "json")
}

// ===== REFERRAL SYSTEM =====
RefLib.track({

  onTouchOwnLink: function() { Bot.sendMessage("❌ Can't use own link"); },

  onAtractedByUser: function(refUser) {

    if (!User.getProperty("referbonus")) {

      var balance = Libs.ResourcesLib.anotherUserRes(
        "balance",
        refUser.telegramid
      )

      balance.add(1)

      Api.sendMessage({
        chat_id: refUser.telegramid,

        text:
          "┏━━━━━━━━━━━━━━━━━━━┓\n" +
          "   🎉 BONUS RECEIVED\n" +
          "┗━━━━━━━━━━━━━━━━━━━┛\n\n" +

          "💰 +₹1 Referral Reward\n" +
          "👤 User: " + user.first_name,

        parse_mode: "html"
      })

      User.setProperty("referbonus", true, "boolean")
    }
  },

  onAlreadyAttracted: function() {

    Bot.sendMessage(
      "┏━━━━━━━━━━━━━━━━━━━┓\n" +
      "   ⚠️ ALREADY STARTED\n" +
      "┗━━━━━━━━━━━━━━━━━━━┛\n\n" +

      "🚀 Invite more users to earn rewards.",

      { parse_mode: "html" }
    )
  },

  linkPrefix: "Bot"
})

// ===== NEW USER HANDLER =====
if (!User.getProperty("UserDone")) {

  User.setProperty("UserDone", true, "boolean")

  // Update stats
  var stats = Libs.ResourcesLib.anotherChatRes("status", "global")

  stats.add(1)

  // Admin alert
  var adminId = Bot.getProperty("ADMIN_ID");

  if (adminId) {

    Api.sendMessage({
      chat_id: adminId,

      text:
        "┏━━━━━━━━━━━━━━━━━━━┓\n" +
        "    👤 NEW USER\n" +
        "┗━━━━━━━━━━━━━━━━━━━┛\n\n" +

        "👤 " + user.first_name + "\n" +
        "🆔 " + user.telegramid + "\n" +
        "📊 Total: " + stats.value(),

      parse_mode: "html"
    })
  }
}
