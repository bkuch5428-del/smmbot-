/*CMD
  command: AA
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

// Command: /allusers

let users = Bot.getProperty("userlist") || [];
let total = users.length;
let list = users.join("\n");

Bot.sendMessage(
  "📊 *Total Users:* `" + total + "`\n\n" + list,
  { parse_mode: "Markdown" }
);

// full credit - @VishalCodeVerse
