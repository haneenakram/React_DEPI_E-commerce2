import { useState } from "react";
import Navbar from "../../cpmponents/Navbar/Navbar";
import Sidebar from "../../cpmponents/Sidebar/Sidebar";
import Cart from "../../cpmponents/Cart/Cart";
export default function Home({ handleChoosenCategory, cart, setCart }) {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  function handleSideBar() {
    setNavIsOpen(!navIsOpen);
  }
  function handleCart() {
    setCartIsOpen(!cartIsOpen);
  }
  return (
    <>
      <Navbar
        handleSideBar={handleSideBar}
        handleCart={handleCart}
        cart={cart}
      />
      <Sidebar
        handleSideBar={handleSideBar}
        navIsOpen={navIsOpen}
        handleChoosenCategory={handleChoosenCategory}
      />
      <Cart
        handleCart={handleCart}
        cartIsOpen={cartIsOpen}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}
