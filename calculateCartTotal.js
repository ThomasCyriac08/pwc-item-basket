const fs = require("fs");
const discount = require("./discount.js");

//Global currency value
const CURRENCY = "\u00A3";

//Fetching item details
function getData(filename = "./input.json") {
  return JSON.parse(fs.readFileSync(filename));
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Input cart list from console
// Items has to named as same as the one listed in the input.json or else it will be invalid item
// Case sensitive
readline.question(`Enter you item basket: `, (cartItems) => {
  const cartList = cartItems.split(" ");
  calculateCartTotal(cartList);
  readline.close();
});

function calculateCartTotal(cartList) {
  const shopItems = getData();
  let cartTotal = 0;

  const checkout = (cartList) => {
    const cart = cartList;
    const count = {};

    cart.forEach((item) => {
      let obj = shopItems.find((o) => o.title === item);
      if (obj) {
        cartTotal += obj.price;
        count[item] = count[item] ? count[item] + 1 : 1;
      }
    });

    let [finalTotal, discountsApplied] = discount(cartTotal, count);

    if (cartTotal === 0) {
      console.log("Item not in stock or invalid item");
      return;
    }

    cartTotal = (cartTotal / 100).toFixed(2);
    console.log("Subtotal:", CURRENCY + cartTotal);

    if (discountsApplied.length) {
      discountsApplied.forEach((x) => console.log(x));
    } else {
      console.log("(no offers available)");
    }

    finalTotal = (finalTotal / 100).toFixed(2);
    console.log("Total:", CURRENCY + finalTotal);
    return finalTotal;
  };

  return checkout(cartList);
}

module.exports = { calculateCartTotal };
