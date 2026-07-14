/*CMD
  command: /setusername
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

// Fetch saved admin ID from Bot Property
let savedAdminId = Bot.getProperty("ADMIN_ID");
let currentUserId = String(user.telegramid);

// Agar Admin ID set nahi hai, ya user match nahi karta -> STOP
if (!savedAdminId || currentUserId != String(savedAdminId)) {
  Bot.sendMessage("❌ <b>Access Denied!</b> You are not the admin.", {
    parse_mode: "html"
  });
  return;
}

// Fetch channel username from params
let channel = params;

// Validate: only username allowed
if (!channel || !channel.startsWith("@") || channel.length < 2) {
  Bot.sendMessage("⚠️ Please use /setusername channel username\nExample: @YourChannel");
  return;
}

// Save channel in Bot Property
Bot.setProperty("force_channel", channel, "string");

// Success message + note
Bot.sendMessage(
  "✅ Force Join Channel Set Successfully\nChannel: " + channel +
  "\n\n⚠️ Note: Make sure to make the bot admin in this channel so join check works properly!"
);
