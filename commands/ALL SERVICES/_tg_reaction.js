/*CMD
  command: /tg_reaction
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
  "👍 *Kitne Telegram Reactions chahiye?*\n\n" +
  "👉 Please enter the *number of reactions*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/tgrec_qty");
