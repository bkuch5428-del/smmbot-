/*CMD
  command: back
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CATEGORIES

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ✅ Back button handler
if (request.data == "back") {

  // 1️⃣ Delete the current message
  Api.deleteMessage({
    chat_id: chat.chatid,
    message_id: request.message.message_id
  });

  // 2️⃣ Run the admin panel command
  Bot.runCommand("SERVICES");
}
