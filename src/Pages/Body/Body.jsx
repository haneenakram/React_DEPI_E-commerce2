import Home from "../Home/Home";
import { useEffect, useState } from "react";

export default function Body() {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? (JSON.parse(storedCart)) : ([]);
  });

  const [message, setMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  function handleChoosenCategory(category) {
    fetch(`${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }

function addToCart(product) {
  const productExists = cart.some((item) => item.id === product.id);
  if (productExists) {
    setMessage("Product is already in the cart");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  } else {
    setCart([...cart, product]);
    setMessage("Product added to cart");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  }
}

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Home
          handleChoosenCategory={handleChoosenCategory}
          cart={cart}
          setCart={setCart}
        />
      </div>
      {message && (
        <div
          className={`fixed top-20 right-5 text-white text-center rounded-md p-2 z-50 ${
            message === "Product added to cart" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}
      <main className="container mx-auto mt-20">
        {products ? (
          <div id="main-content">
            <div
              id="products"
              className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative border shadow rounded-2 px-3 py-2 group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full mb-2"
                    style={{ height: "200px" }}
                  />
                  <div className="absolute top-0 right-0 flex flex-col items-center justify-center h-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fa fa-search text-white bg-black p-2 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 hover:text-blue-500"></i>
                    <i
                      className="fa fa-shopping-cart text-white bg-black p-2 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 hover:text-yellow-500"
                      onClick={() => addToCart(product)}
                    ></i>
                    <i className="fa fa-heart text-white bg-black p-2 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 hover:text-red-500"></i>
                  </div>
                  <h4 className="mb-1 text-center">{product.title}</h4>
                  <div className="flex gap-2 mb-3 items-center">
                    {[...Array(Math.floor(product.rating))].map((_, index) => (
                      <span key={index} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    <div className="px-2 bg-red-600 bg-opacity-75 rounded-full">
                      {product.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            id="loading"
            className="flex h-screen justify-center items-center"
          >
            <h2>Loading....</h2>
          </div>
        )}
      </main>
    </>
  );
}
