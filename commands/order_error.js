/*CMD
  command: order_error
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /order_error
let errorMsg = "❌ Order failed due to a server error.\n\n" +
               "⚠️ Please try again after some time.";

if (content) {
  errorMsg += "\n\n🔎 Error Details:\n" + content;
}

Bot.sendMessage(errorMsg);
