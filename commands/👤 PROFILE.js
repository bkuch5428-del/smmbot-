/*CMD
  command: 👤 PROFILE
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

var balance = Libs.ResourcesLib.userRes("balance");
var bal = parseFloat(balance.value() || 0).toFixed(2);

var name = user.first_name || "User";
var username = user.username ? "@" + user.username : "No Username";
var userid = user.telegramid || "N/A";

var msg =
"╔════════════════════╗\n" +
"       👤 USER PROFILE\n" +
"╚════════════════════╝\n\n" +
"🪪 Name: " + name + "\n" +
"🔗 Username: " + username + "\n" +
"🆔 User ID: " + userid + "\n\n" +
"╔════════════════════╗\n" +
"💰 Balance: ₹" + bal + "\n" +
"╚════════════════════╝\n\n" +
"⚡ Use the menu below to continue.";

Bot.sendMessage(msg);
