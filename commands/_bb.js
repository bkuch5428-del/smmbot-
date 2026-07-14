/*CMD
  command: /bb
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

// 🔴 OFFICIAL CHANNEL (JUST INFO)
let CHANNEL = "@VishalCodeVerse";

// get email
let email = params;

// basic email validation
if (!email || !email.includes("@") || !email.includes(".")) {
  Bot.sendMessage(
    "❌ *Invalid Email Address!*\n\n" +
    "➤ Example: `google@gmail.com`",
    { parse_mode: "Markdown" }
  );
  return;
}

// ✅ INSTALL BOT
BBAdmin.installBot({
  bot_id: bot.id,
  email: email
});

// success message
Bot.sendMessage(
  "✅ *Bot Successfully Sent To Your Bots.Business Mail!* 💌\n\n" +
  "📩 *Email:* `" + email + "`\n\n" +
  "📢 *Join our official channel:* " + CHANNEL + "\n" +
  "🙏 Please join for updates & support.",
  { parse_mode: "Markdown" }
);
