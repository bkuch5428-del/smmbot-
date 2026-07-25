# Bobby SMM Robot

A Telegram bot for SMM (Social Media Marketing) services, built for the [Bots.Business](https://bots.business) platform.

## What this is

This bot is **not** a standalone Node.js app. It runs on **Bots.Business** (a cloud-based Telegram bot platform). The files here are the bot's command scripts, designed to be imported into that platform.

- **Bot name:** Bobby_smm_robot
- **Telegram handle:** [@Bobby_smm_robot](https://t.me/Bobby_smm_robot)
- **Platform:** [Bots.Business](https://bots.business)

## Project structure

```
bot.json              # Bot metadata (name, sync version, git remote)
commands/             # All bot command scripts (Bots.Business JS)
  _start.js           # Entry point — /start command
  _mainmenu.js        # Main menu handler
  _bb.js              # Bots.Business helper utilities
  ADMIN/              # Admin-only commands
  DEPOSIT/            # Deposit/payment commands
  FACEBOOK/           # Facebook SMM service commands
  INSTGRAM/           # Instagram SMM service commands
  TELEGRAM/           # Telegram SMM service commands
  YOUTUBE/            # YouTube SMM service commands
  CATEGORIES/         # Service category commands
  ALL SERVICES/       # All-services listing commands
  EXTRA SERVICE/      # Extra service commands
  VC GETAWAY/         # VC gateway commands
  VISHAL/             # Vishal-specific commands
  _*_qty.js           # Quantity/validation helpers per service
  cancel_order.js     # Order cancellation handler
  order_success.js    # Order success callback
  order_error.js      # Order error callback
  track_*.js          # Order tracking handlers
  price_list.js       # Price list command
  handle_redeem_code.js  # Promo code redemption
```

## How to use / deploy

1. Create a Telegram bot via [@BotFather](https://t.me/BotFather) and copy the secret token.
2. Log in to [Bots.Business](https://bots.business) and create a new bot with that token.
3. Import this GitHub repo into your Bots.Business bot.
4. The commands in the `commands/` folder are automatically deployed to the platform.

## Command file format

Each `.js` file in `commands/` follows this Bots.Business convention:

```js
/*CMD
  command: /example
  help: Description of what this command does
  answer: Optional static reply text
  keyboard: Button1, Button2
  aliases: /alt1, /alt2
CMD*/

// JavaScript body using Bots.Business JS API
Bot.sendMessage("Hello!");
```

## User preferences

- User wants to make direct code edits to the bot command files in this repo.
