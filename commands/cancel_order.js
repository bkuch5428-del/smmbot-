/*CMD
  command: cancel_order
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

// CALLBACK: cancel_order
if (request.data == "cancel_order") {

  Api.editMessageText({
    chat_id: chat.chatid,
    message_id: request.message.message_id,
    text:
      "🚫 *Order Cancelled Successfully*\n\n" +
      "ℹ️ Your order request has been cancelled.\n" +
      "🛒 No amount has been deducted.\n\n" +
      "_You can place a new order anytime from the menu._",
    parse_mode: "Markdown"
  });

  User.setProperty("order_qty", null);
  User.setProperty("order_link", null);
}
