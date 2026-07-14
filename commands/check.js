/*CMD
  command: check
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

var user = options.result.status
if ((user == "member") | (user == "administrator") | (user == "creator")) {
  User.setProperty("userStatus", user, "string")
  Bot.runCommand("/mainmenu")
}

if (user == "left") {
  Bot.sendMessage("*⚠️ You Must Join Our All Channels*")
}
