import { useState, useEffect } from "react";

export default function Cart({ handleCart, cartIsOpen, cart, setCart }) {
  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = localStorage.getItem("quantities");
    if (savedQuantities) {
      return JSON.parse(savedQuantities);
    } else if (cart.length > 0) {
      return cart.map(() => 1);
    } else {
      return [];
    }
  });

  const [total, setTotal] = useState(() => {
    const savedTotal = localStorage.getItem("total");
    if (savedTotal) {
      return JSON.parse(savedTotal);
    } else if (cart.length > 0) {
      return cart.reduce((acc, product) => acc + product.price, 0);
    } else {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
    setTotal(roundToTwoDecimals(getTotal()));
  }, [quantities, cart]);

  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  function getTotal() {
    return cart.reduce(
      (acc, product, index) => acc + product.price * (quantities[index] || 1),
      0
    );
  }
  function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
  function handleAction(action, index) {
    const newQuantities = [...quantities];
    const newCart = [...cart];

    if (action === "increase") {
      newQuantities[index] = (newQuantities[index] || 1) + 1;
    } else if (action === "decrease") {
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      } else {
        newCart.splice(index, 1);
        newQuantities.splice(index, 1);
      }
    } else if (action === "remove") {
      newCart.splice(index, 1);
      newQuantities.splice(index, 1);
    }

    setQuantities(newQuantities);
    setCart(newCart);
  }

  return (
    <div
      className={`overflow-y-auto fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
        cartIsOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button onClick={handleCart} className="text-2xl mb-4">
          <i className="fas fa-arrow-right"></i> Back
        </button>
        <hr />
        <ul>
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <div key={product.id} className="card bg-gray-800 mb-3">
                <div className="flex items-center">
                  <div className="w-1/3 relative">
                    <button
                      className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-1.5 py-0.5"
                      data-action="remove"
                      onClick={() => handleAction("remove", index)}
                    >
                      ×
                    </button>
                    <img
                      src={product.images[0]}
                      className="w-full h-auto"
                      alt="Product Image"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="card-body">
                      <h5 className="text-white text-lg">{product.title}</h5>
                      <p className="text-white">
                        Price: $<span id="price">{product.price}</span>
                      </p>
                      <div className="flex items-center mb-3">
                        <button
                          className="bg-gray-700 text-white px-2 py-0.5 rounded-full"
                          type="button"
                          data-action="decrease"
                          onClick={() => handleAction("decrease", index)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="text-center w-12 mx-2 rounded-full text-black"
                          id="quantity"
                          value={quantities[index] || 1}
                          readOnly
                        />
                        <button
                          className="bg-gray-700 text-white px-2 py-0.5 rounded-full"
                          type="button"
                          data-action="increase"
                          onClick={() => handleAction("increase", index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Your cart is empty.</p>
          )}
        </ul>
        <p className="text-white">
          Total: $<span id="total">{total}</span>
        </p>
      </div>
    </div>
  );
}
