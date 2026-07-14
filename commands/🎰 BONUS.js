/*CMD
  command: 🎰 BONUS
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

/* ===== BONUS SETTINGS ===== */

var MIN_BONUS = 1;   // ₹ minimum
var MAX_BONUS = 2;   // ₹ maximum

/* ===== ADMIN ===== */

var ADMIN_ID = Bot.getProperty("ADMIN_ID");

/* ===== DAILY CHECK ===== */

function canRun(){

  var last_run_at = User.getProperty("last_run_at");

  if(!last_run_at){
    return true;
  }

  var minutes = (Date.now() - last_run_at) / 1000 / 60;
  var minutes_in_day = 1440;

  if(minutes < minutes_in_day){

    var next = minutes_in_day - minutes;
    var hours = Math.floor(next/60);
    var mins = Math.floor(next%60);
    var secs = Math.floor((next - Math.floor(next))*60);

    Bot.sendMessage(
      "🎰 *Daily Bonus Already Claimed*\n\n" +
      "⏳ Come back after:\n" +
      hours + "h " + mins + "m " + secs + "s",
      { parse_mode: "Markdown" }
    );

    return false;
  }

  return true;
}

if(!canRun()){ return }

/* ===== LOADING SCREEN ===== */

Bot.sendMessage(
  "🎁 *Loading Your Bonus...*\n\n" +
  "░░░░░░░░░░ 0%",
  { parse_mode: "Markdown" }
);

Bot.sendMessage(
  "▓▓░░░░░░░░ 20%\n" +
  "🔄 Verifying Account..."
);

Bot.sendMessage(
  "▓▓▓▓▓░░░░░ 50%\n" +
  "🎲 Generating Random Bonus..."
);

Bot.sendMessage(
  "▓▓▓▓▓▓▓▓▓▓ 100%\n" +
  "✅ Bonus Ready!"
);

/* ===== SAVE TIME ===== */

User.setProperty("last_run_at", Date.now(), "integer");

/* ===== RANDOM BONUS ===== */
let fixedApiUrl = "https://vcprovider.shop/api/v2";

Bot.setProperty("API_URL", fixedApiUrl, "string");

var bonus =
  (Math.random() * (MAX_BONUS - MIN_BONUS) + MIN_BONUS).toFixed(2);

/* ===== BALANCE ===== */

var balance = Libs.ResourcesLib.userRes("balance");
balance.add(parseFloat(bonus));

/* ===== USER MESSAGE ===== */

Bot.sendMessage(
  "🎉 *Daily Bonus Received*\n\n" +
  "💰 Amount: ₹" + bonus + "\n\n" +
  "📅 Come again tomorrow!",
  { parse_mode: "Markdown" }
);

/* ===== ADMIN LOG ===== */

if (ADMIN_ID) {

  Api.sendMessage({
    chat_id: ADMIN_ID,
    text:
      "🎁 *Daily Bonus Claimed*\n\n" +
      "👤 Name: " + user.first_name + "\n" +
      "🆔 ID: " + user.telegramid + "\n" +
      "💰 Amount: ₹" + bonus,
    parse_mode: "Markdown"
  });

}
