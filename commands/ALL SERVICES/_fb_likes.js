/*CMD
  command: /fb_likes
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

// Command: /fb_likes
Bot.sendMessage("*👍 Enter the number of Facebook Likes you want*:");
Bot.runCommand("/getfb_likes_qty");
