/*CMD
  command: /joined
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

// Check if user is banned
let stat = Bot.getProperty("" + user.telegramid + "?Ban");

if (stat == "ban") {
  Bot.sendMessage("❌ You're Banned From Using The Bot");
} else {

  // Fetch channel username from Bot Property (set by admin)
  let channel = Bot.getProperty("force_channel");
  let id = user.telegramid;

  if (!channel) {
    Bot.sendMessage("⚠️ Channel not set by admin yet.");
    return;
  }

  // Check if user is a member of the channel
  Api.getChatMember({
    chat_id: channel,
    user_id: id,
    on_result: "check",
    on_error: "notAdmin"
  });
}
