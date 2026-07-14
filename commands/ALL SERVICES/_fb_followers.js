/*CMD
  command: /fb_followers
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
  "👥 *Kitne Facebook Followers chahiye?*\n\n" +
  "👉 Please enter quantity:",
  { parse_mode: "Markdown" }
);

Bot.runCommand("/fb_follow_qty");
