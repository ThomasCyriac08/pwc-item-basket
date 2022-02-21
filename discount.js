// returns total with discounts added
function discount(total, cartList) {
  //get discount offers
  const itemDiscount = [
    {
      name: "Apples",
      price: 100,
      discount: 0.1,
      description: "Apples 10% off: -",
    },
  ];

  //conditional dicounts
  const conditionalDiscount = {
    item1: "Soup",
    item1Count: 2,
    item2: "Bread",
    item2Count: 1,
    discountRate: 0.5,
    discountPrice: 80,
    description: "Bread 50% off: -",
  };

  let discountsApplied = [];
  let finalTotal = total;

  itemDiscount.forEach((item) => {
    if (cartList[item.name]) {
      let discountValue = item.price * item.discount * cartList[item.name];
      finalTotal = total - discountValue;
      discountsApplied.push(`${item.description} ${discountValue}p`);
    }
  });

  if (
    cartList[conditionalDiscount.item1] &&
    cartList[conditionalDiscount.item2]
  ) {
    item1Counter = Math.floor(
      cartList[conditionalDiscount.item1] / conditionalDiscount.item1Count
    );
    item2counter = Math.floor(
      cartList[conditionalDiscount.item2] / conditionalDiscount.item2Count
    );

    for (let i = 0; i < item2counter && i < item1Counter; i++) {
      let discountValue =
        conditionalDiscount.discountPrice * conditionalDiscount.discountRate;
      finalTotal = finalTotal - discountValue;
      discountsApplied.push(
        `${conditionalDiscount.description} ${discountValue}p`
      );
    }
  }

  return [finalTotal, discountsApplied];
}

module.exports = discount;
