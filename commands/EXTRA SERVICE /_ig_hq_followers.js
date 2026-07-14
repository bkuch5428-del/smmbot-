/*CMD
  command: /ig_hq_followers
  help: 
  need_reply: false
  auto_retry_time: 
  folder: EXTRA SERVICE 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /ig_hq_followers

Bot.sendMessage(
  "👤 *Instagram Followers (High Quality)*\n\n" +
  "💎 Quality: *High Quality & Stable*\n" +
  "💰 Price: *₹198 per 1K Followers*\n\n" +
  "📥 Kitne followers chahiye?\n" +
  "👉 Please enter the *quantity* (example: 100, 500, 1000):",
  { parse_mode: "Markdown" }
);

Bot.runCommand("/ig_hq_followers_qty");
