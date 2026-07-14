/*CMD
  command: /insta_repost
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

// Command: /ig_repost

Bot.sendMessage(
  "🔁 *Kitne Instagram Reposts chahiye?*\n\n" +
  "👉 Please enter the *number of reposts*:",
  { parse_mode: "Markdown" }
);

Bot.runCommand("/ig_repost_qty");
