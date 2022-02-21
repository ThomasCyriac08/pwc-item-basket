const { calculateCartTotal } = require("./calculateCartTotal.js");

global.console.log = jest.fn();

describe("Cart Tests", () => {
  it("Empty cart list", () => {
    calculateCartTotal([]);
    expect(console.log).toHaveBeenCalledWith(
      "Item not in stock or invalid item"
    );
  });

  it("Invalid or wrong item name", () => {
    calculateCartTotal(["sadasxcasd"]);
    expect(console.log).toHaveBeenCalledWith(
      "Item not in stock or invalid item"
    );
  });

  it("Test Soup/Bread discount", () => {
    // Soup price = 0.65
    // Bread price = 0.80
    // total price with bread 50% discount = 0.65 + 0.65 + 0.40 = 1.70
    expect(calculateCartTotal(["Soup", "Soup", "Bread"])).toBe("1.70");
  });

  it("Test Apples Discount", () => {
    // total price with apples 10% discount = 0.90
    expect(calculateCartTotal(["Apples"])).toBe("0.90");
  });

  it("Test Apples, Soup and Bread Discount", () => {
    // Soup price = 0.65

    // Apples price = 1.00
    // total price with bread 50% discount and apples 10% discount = 0.65 + 0.65 + 0.40 + 0.90 = 2.60
    expect(calculateCartTotal(["Apples", "Soup", "Soup", "Bread"])).toBe(
      "2.60"
    );
  });

  it("Test Bread", () => {
    // Bread price = 0.80
    expect(calculateCartTotal(["Bread"])).toBe("0.80");
  });
});
