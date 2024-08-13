import { useState } from "react";
import { useEffect } from "react";
export default function Sidebar({
  handleSideBar,
  navIsOpen,
  handleChoosenCategory,
}) {
  const [categories, setCategories] = useState(null);
  const [menCategories, setMenCategories] = useState([]);
  const [womenCategories, setWomenCategories] = useState([]);
  const [electronicsCategories, setElectonicsCategories] = useState([]);
  const [menIsDropdownOpen, setMenIsDropdownOpen] = useState(false);
  const [womenIsDropdownOpen, setWomenIsDropdownOpen] = useState(false);
  const [electroIsDropdownOpen, setElectroIsDropdownOpen] = useState(false);
  let remainedCat;
  if (categories) {
    remainedCat = categories.filter(
      (category) =>
        !category.name.includes("Womens") &&
        !category.name.includes("Mens") &&
        !category.name.includes("Tablets") &&
        !category.name.includes("Smartphones") &&
        !category.name.includes("Laptops")
    );
  }
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const menCats = data.filter((category) =>
          category.name.includes("Mens")
        );
        setMenCategories(menCats);
        const womenCats = data.filter((category) =>
          category.name.includes("Womens")
        );
        setWomenCategories(womenCats);
        const electroCat = data.filter(
          (category) =>
            category.name.includes("Tablets") ||
            category.name.includes("Smartphones") ||
            category.name.includes("Laptops")
        );
        setElectonicsCategories(electroCat);
      });
  }, []);
  const womenToggleDropdown = () => {
    setWomenIsDropdownOpen(!womenIsDropdownOpen);
  };
  const menToggleDropdown = () => {
    setMenIsDropdownOpen(!menIsDropdownOpen);
  };
  const electroToggleDropdown = () => {
    setElectroIsDropdownOpen(!electroIsDropdownOpen);
  };
  return (
    <div
      className={`overflow-y-auto fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        navIsOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button onClick={handleSideBar} className="text-2xl mb-4">
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <hr />
        <ul>
          {menCategories.length > 0 && (
            <li className="mt-4 cursor-pointer ">
              <button
                onClick={menToggleDropdown}
                className="w-full text-left flex justify-between"
              >
                <span className="relative inline-block text-white">
                  Men
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </button>
              {menIsDropdownOpen && (
                <ul className="ml-4 mt-2">
                  {menCategories.map((menCategory) => (
                    <li key={menCategory.slug} className="cursor-pointer group">
                      <a
                        onClick={() => handleChoosenCategory(menCategory.url)}
                        className="relative inline-block text-white"
                      >
                        {menCategory.name}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
          {womenCategories.length > 0 && (
            <li className="mt-4 cursor-pointer">
              <button
                onClick={womenToggleDropdown}
                className="w-full text-left flex justify-between"
              >
                <span className="relative inline-block text-white">
                  Women
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </button>
              {womenIsDropdownOpen && (
                <ul className="ml-4 mt-2">
                  {womenCategories.map((womenCategory) => (
                    <li
                      key={womenCategory.slug}
                      className="cursor-pointer group"
                    >
                      <a
                        onClick={() => handleChoosenCategory(womenCategory.url)}
                        className="relative inline-block text-white"
                      >
                        {womenCategory.name}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
          {electronicsCategories.length > 0 && (
            <li className="mt-4 cursor-pointer">
              <button
                onClick={electroToggleDropdown}
                className="w-full text-left flex justify-between"
              >
                <span className="relative inline-block text-white">
                  Electronics
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </button>
              {electroIsDropdownOpen && (
                <ul className="ml-4 mt-2">
                  {electronicsCategories.map((electroCategory) => (
                    <li
                      key={electroCategory.slug}
                      className="cursor-pointer group"
                    >
                      <a
                        onClick={() =>
                          handleChoosenCategory(electroCategory.url)
                        }
                        className="relative inline-block text-white"
                      >
                        {electroCategory.name}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
          {remainedCat ? (
            remainedCat.map((category) => (
              <li
                className="mt-4 cursor-pointer group"
                key={category.slug}
                id={category.slug}
              >
                <a
                  onClick={() => handleChoosenCategory(category.url)}
                  className="relative inline-block text-white"
                >
                  {category.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))
          ) : (
            <p>loading</p>
          )}
        </ul>
      </div>
    </div>
  );
}
