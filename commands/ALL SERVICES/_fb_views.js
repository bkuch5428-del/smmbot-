/*CMD
  command: /fb_views
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

Bot.sendMessage(
  "👀 *Kitne Facebook Views chahiye?*\n\n" +
  "👉 Please enter quantity:",
  { parse_mode: "Markdown" }
);

Bot.runCommand("/fb_views_qty");
