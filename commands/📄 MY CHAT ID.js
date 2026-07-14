/*CMD
  command: 📄 MY CHAT ID
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

// COMMAND: 📄 My Chat ID

var name = user.first_name ? user.first_name : "User"
var username = user.username ? user.username : null
var id = user.telegramid

var msg =
"╔══════════════════╗\n"+
"     📄 MY CHAT INFO\n"+
"╚══════════════════╝\n\n"+
"👤 Name: " + name + "\n"+
"🆔 Chat ID: " + id + "\n\n"+
"⚡ Use this ID for support or services."

var buttons = {
  inline_keyboard: []
}

// Username button (clickable profile link)
if(username){
  buttons.inline_keyboard.push([
    {
      text: "🔗 @" + username,
      url: "https://t.me/" + username,
      style: "primary"
    }
  ])
}

Api.sendMessage({
  text: msg,
  parse_mode: "html",
  reply_markup: buttons
})
