import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Ellipses from "../../utills/Ellipses";
import { useSelector } from "react-redux";
import SubHeader from "../SubHeader/SubHeader";


function Navbar({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isLoggedIn] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedCategory(localCategory);
    setSearchQuery(localSearch);
  };

  const hideSmallScreenExtras = location.pathname === "/login" || location.pathname === "/cart";

  return (
    <>
      <nav className="navbar navbar-dark bg-dark py-2 fixed-top pb-md-0">

        <div className="container pb-2 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-light d-md-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span
                className="navbar-toggler-icon"
                style={{ height: "1.3rem", width: "1.2rem" }}
              ></span>
            </button>
            {/* Logo */}
            <NavLink className="navbar-brand fw-bold text-warning" to="/">
              MobiCart
            </NavLink>
          </div>

          <form
            className="d-none d-md-flex flex-grow-1 mx-2"
            style={{ maxWidth: "700px" }}
            onSubmit={handleSubmit}
          >
            <select
              className="form-select rounded-start"
              style={{ maxWidth: "4.5rem" }}
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
            </select>

            <input
              className="form-control rounded-0"
              type="search"
              placeholder="Search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button className="btn btn-warning rounded-end" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex align-items-center gap-3">
            <NavLink
              to={isLoggedIn ? "/profile" : "/login"}
              className="nav-link text-white d-flex align-items-center gap-1"
            >
              <FaUser />
              <span className="d-none d-md-inline">
                {isLoggedIn ? "Hello, User" : "Sign in"}
              </span>
            </NavLink>

            <NavLink
              to="/add-cart"
              className="nav-link text-white position-relative d-flex align-items-center gap-1"
            >
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </div>
        </div>
        <div className='w-100 d-none d-md-block' style={{ backgroundColor: "#232f3e" }}>
          <SubHeader localCategory={localCategory}
            setLocalCategory={setLocalCategory}
            setSelectedCategory={setSelectedCategory} />
        </div>

        {!hideSmallScreenExtras && (
          <div className="d-md-none mt-2 px-2 w-100">
            <form className="d-flex mb-2" onSubmit={handleSubmit}>
              <select
                className="form-select rounded-start"
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                style={{ minWidth: "4.2rem" }}
              >
                <option value="All">All</option>
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
              </select>

              <input
                className="form-control rounded-0"
                type="search"
                placeholder="Search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button className="btn btn-warning rounded-end" type="submit">
                Search
              </button>
            </form>
            <span
              className="nav-single-line nav-persist-content text-white d-block"
              id="glow-ingress-single-line"
              style={{ fontSize: "0.9rem", cursor: "pointer" }}
            >
              <Ellipses text={"Delivering to New Delhi 110043"} maxChars={43} />
            </span>
          </div>
        )}
      </nav>
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="offcanvasNavbar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-warning">MobiCart</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          <NavLink
            to={isLoggedIn ? "/profile" : "/login"}
            className="nav-link text-white"
          >
            <div className="small">
              {isLoggedIn ? "Hello, User" : "Hello, Sign in"}
            </div>
            <strong>Account & Lists</strong>
          </NavLink>

          <NavLink to="/orders" className="nav-link text-white">
            <div className="small">Returns</div>
            <strong>& Orders</strong>
          </NavLink>
          <hr className="border-light" />
          {/* Additional Offcanvas Links */}
          <NavLink to="/profile" className="nav-link text-white">
            Profile Settings
          </NavLink>
          <NavLink to="/trending" className="nav-link text-white">
            Trending
          </NavLink>
          <div>
            <label htmlFor="offcanvasCategorySelect" className="form-label text-warning">
              Top Categories
            </label>
            <select
              id="offcanvasCategorySelect"
              className="form-select"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
          <NavLink to="/features" className="nav-link text-white">
            Features
          </NavLink>
          <NavLink to="/logout" className="nav-link text-white">
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
