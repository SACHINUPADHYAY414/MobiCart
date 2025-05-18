import { useEffect, useState } from "react";
import ProductCard from "../../Component/ProductCard/ProductCard";
// import { fetchDataWithParams } from "../../api/axios.js";
// import { decrypt } from "../../utills/encryption.js";
import { Products } from "../../Data/Product.jsx";
import { useNavigate } from "react-router-dom";


const categories = ['Mobiles', 'Electronics'];

const Layout = ({ selectedCategory, setSelectedCategory, searchQuery }) => {
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            //   const response = await fetchDataWithParams("/v2/products");

            //   if (response.status === 204) return;

            //   const decryptedData = decrypt(response.data);
            //   const parsedData = JSON.parse(decryptedData);
            setProductsData(Products);
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || 'An unknown error occurred';
            if (err?.response?.status !== 204) {
                console.error("Error fetching products:", errorMessage);
            }
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const selectProduct = (product) => {
        navigate(`/cart/${product.id}`, { state: { product } });
    };


    const filteredProducts = productsData.filter((product) => {
        const matchesCategory =
            !selectedCategory || selectedCategory === "All"
                ? true
                : product.category === selectedCategory;

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container-fluid" style={{ background: '#eee', minHeight: '100vh' }}>
            <div className="row py-3">
                {/* Sidebar */}
                <div
                    className="col-md-3 d-none d-md-block"
                    style={{
                        zIndex: 1000,
                        position: 'sticky',
                        top: 0,
                        maxHeight: '100vh',
                        overflowY: 'auto',
                    }}
                >
                    <div className="border rounded p-3 bg-white">
                        <h5>Categories</h5>
                        <ul className="list-group">
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
                    </div>
                </div>

                {/* Product Grid */}
                <div
                    className="col-md-9"
                    style={{ maxHeight: '100vh', overflowY: 'auto', zIndex: 999 }}
                >
                    <div className="row g-2">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
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
