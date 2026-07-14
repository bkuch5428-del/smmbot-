/*CMD
  command: /yt_views
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
  "👁️‍🗨️ *Kitne YouTube Views chahiye?*\n\n" +
  "👉 Please enter the *number of Views*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/ytviews_qty");
