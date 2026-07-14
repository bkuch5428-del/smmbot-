/*CMD
  command: /yt_likes
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ALL SERVICES

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /order
Bot.sendMessage(
  "👍 *Kitne YouTube Likes chahiye?*\n\n" +
  "👉 Please enter the *number of likes*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/ytlike_qty");
