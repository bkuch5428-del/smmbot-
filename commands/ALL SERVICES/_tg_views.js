/*CMD
  command: /tg_views
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
  "👁️‍🗨️ *Kitne Telegram views chahiye?*\n\n" +
  "👉 Please enter the *number of views*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/tgviews_qty");
