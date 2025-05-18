import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./Component/Nav/Nav";
import Carousel from "./Component/Carosel/Carosel";
import Mobile from "./Page/Mobile/Mobile";
import CartCard from "./Component/CartCard/CartCard";
import AddToCart from "./Page/AddToCart/AddToCart";
import NotFound from "./Component/NotFound/NotFound";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="app-wrapper">
        <Nav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Carousel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
            />} />

            <Route path="/mobile" element={<Mobile />} />

            <Route path="/cart/:id" element={<CartCard />} />
            <Route path="/add-cart" element={<AddToCart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
