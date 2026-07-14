/*CMD
  command: ⬅️ BACK
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

Bot.runCommand("/mainmenu")

let fixedApiUrl = "https://vcprovider.shop/api/v2";

Bot.setProperty("API_URL", fixedApiUrl, "string");
