/*CMD
  command: /tg_members
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
  "👤 *Kitne Telegram subscribers chahiye?*\n\n" +
  "👉 Please enter the *number of subscribers*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/tgsub_qty");
