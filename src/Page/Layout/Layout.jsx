import { useEffect, useState } from "react";
import ProductCard from "../../Component/ProductCard/ProductCard";
import { Products } from "../../Data/Product.jsx";
import { useNavigate } from "react-router-dom";

const categories = ['Mobiles', 'Electronics'];

const priceRanges = [
    { label: 'Under 5000', value: 5000 },
  { label: "Below ₹10,000", min: 0, max: 9999 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Above ₹20,000", min: 20001, max: Infinity },
];

const Layout = ({ selectedCategory, setSelectedCategory, searchQuery }) => {
  const [productsData, setProductsData] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductsData(Products);
  }, []);

  const selectProduct = (product) => {
    navigate(`/cart/${product.id}`, { state: { product } });
  };

  // Toggle price range selection
  const handlePriceChange = (range) => {
    setSelectedPrices(prev =>
      prev.some(p => p.min === range.min && p.max === range.max)
        ? prev.filter(p => p.min !== range.min || p.max !== range.max)
        : [...prev, range]
    );
  };

  const filteredProducts = productsData.filter(product => {
    // Category filter
    const matchesCategory =
      !selectedCategory || selectedCategory === "All"
        ? true
        : product.category === selectedCategory;

    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Price filter (OR logic: product price in any selected range)
    const priceNum = typeof product.price === "string" ? Number(product.price.replace(/,/g, "")) : product.price;
    const matchesPrice =
      selectedPrices.length === 0
        ? true
        : selectedPrices.some(range => priceNum >= range.min && priceNum <= range.max);

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="container-fluid" style={{ background: '#eee', minHeight: '100vh' }}>
      <div className="row py-3">

        {/* Sidebar */}
        <div className="col-md-3 d-none d-md-block" style={{
          zIndex: 1000,
          position: 'sticky',
          top: 0,
          maxHeight: '100vh',
          overflowY: 'auto',
        }}>
          <div className="border rounded bg-white p-3">

            <h5>Filters</h5>

            {/* Category Filter */}
            <ul className="list-group mb-3">
              <li
                className={`list-group-item ${!selectedCategory || selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
                style={{ cursor: 'pointer' }}
              >
                All
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{ cursor: 'pointer' }}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* Price Filter */}
            <h6>Price Range</h6>
            <ul className="list-group">
              {priceRanges.map(({ label, min, max }) => (
                <li key={label} className="list-group-item">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedPrices.some(p => p.min === min && p.max === max)}
                    onChange={() => handlePriceChange({ min, max })}
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-md-9" style={{ maxHeight: '100vh', overflowY: 'auto', zIndex: 999 }}>
          <div className="row g-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <ProductCard
                    product={product}
                    selectProduct={selectProduct}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
