/*CMD
  command: /yt_subs
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
  "🔔 *Kitne YouTube Subscribers chahiye?*\n\n" +
  "👉 Please enter the *number of subscribers*:",
  { parse_mode: "Markdown" }
);
Bot.runCommand("/ytsub_qty");
