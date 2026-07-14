/*CMD
  command: 🧾 MY ORDERS
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

// COMMAND: /my_orders

let myOrders = User.getProperty("my_orders", [])

if (!myOrders || myOrders.length === 0) {
  return Bot.sendMessage(
    "╔══════════════════╗\n" +
    "      📦 MY ORDERS\n" +
    "╚══════════════════╝\n\n" +
    "❌ No orders found.\n\n" +
    "🛒 Place your first order from the services menu.",
    { parse_mode: "html" }
  )
}

let orders = myOrders.slice().reverse()

const MAX_LEN = 4096

let text =
  "╔══════════════════╗\n" +
  "      📦 MY ORDERS\n" +
  "╚══════════════════╝\n\n"

let shown = 0

for (let i = 0; i < orders.length; i++) {

  let item = orders[i]
  let orderId = (item && item.order_id) ? item.order_id : item

  let line =
    "🔹 Order ID:\n" +
    "<code>" + orderId + "</code>\n\n"

  if ((text.length + line.length + 50) > MAX_LEN) break

  text += line
  shown++
}

text += "━━━━━━━━━━━━━━\n"
text += "💡 <i> Order ID to Track Order 🔥</i>"

if (shown < orders.length) {
  text += "\n\n<i>+" + (orders.length - shown) + " older orders hidden</i>"
}

Bot.sendMessage(text, { parse_mode: "html" })
