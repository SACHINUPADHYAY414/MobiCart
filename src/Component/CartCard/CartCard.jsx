import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { loaderImage } from "../../utills/Constrant";
import { FaStar } from "react-icons/fa";

const CartCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = location.state?.product;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigate("/add-cart");
    };
    if (!product) {
        return <p className="text-center mt-5">No product data found.</p>;
    }

    const images = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.image
            ? [product.image]
            : product.imgUrl
                ? [product.imgUrl]
                : [];

    if (images.length === 0) {
        return <p className="text-center mt-5">No images available.</p>;
    }

    return (
        <div className="container-fluid mt-3">
            <div className="container" style={{ maxHeight: "100vh" }}>
                <div className="row">
                    {/* --- Large screen (desktop/laptop) Image Section --- */}
                    <div
                        className="d-none d-md-flex col-md-5 gap-3 p-2 bg-white rounded shadow-sm position-sticky"
                        style={{
                            top: "10vh",
                            alignSelf: "flex-start",
                        }}
                    >
                        {/* Thumbnails */}
                        <div
                            className="d-flex flex-column gap-2 pe-2"
                            style={{
                                overflowY: "auto",
                                maxHeight: "75vh",
                            }}
                        >
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    style={{
                                        cursor: "pointer",
                                        border:
                                            idx === selectedIndex
                                                ? "2px solid #0d6efd"
                                                : "1px solid #ccc",
                                        padding: "3px",
                                        borderRadius: "6px",
                                        backgroundColor:
                                            idx === selectedIndex ? "#e7f1ff" : "white",
                                    }}
                                >
                                    <img
                                        src={img}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = loaderImage;
                                        }}
                                        alt={`icon`}
                                        className="img-fluid"
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image & Buttons */}
                        <div className="d-flex flex-column justify-content-between flex-grow-1">
                            <img
                                src={images[selectedIndex]}
                                alt={`Selected ${selectedIndex}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = loaderImage;
                                }}
                                className="img-fluid rounded"
                                style={{
                                    maxHeight: "calc(80vh - 70px)",
                                    objectFit: "contain",
                                }}
                            />
                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-warning w-50 fw-semibold" onClick={handleAddToCart}>
                                    <i className="bi bi-cart3 me-2"></i>Add to Cart
                                </button>
                                <button className="btn btn-danger w-50 fw-semibold">
                                    <i className="bi bi-lightning-fill me-2"></i>Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- Mobile/Tablet view --- */}
                    <div className="d-block d-md-none">
                        {/* Main image */}
                        <div className="text-center">
                            <img
                                src={images[selectedIndex]}
                                alt={`Selected ${selectedIndex}`}
                                className="img-fluid"
                                style={{
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        {/* Horizontal Thumbnails */}
                        <div
                            className="d-flex overflow-auto mt-2 px-2"
                            style={{ gap: "10px" }}
                        >
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    style={{
                                        border:
                                            idx === selectedIndex
                                                ? "2px solid #0d6efd"
                                                : "1px solid #ccc",
                                        padding: "3px",
                                        borderRadius: "6px",
                                        minWidth: "60px",
                                        backgroundColor:
                                            idx === selectedIndex ? "#e7f1ff" : "white",
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumb ${idx}`}
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Product Details Section --- */}
                    <div className="col-12 col-md-6 ms-md-3 mt-4 mt-md-0 mb-2 mb-md-0">
                        <h5 className="fw-bold text-dark">{product.name}</h5>
                        <span className="text-muted small">
                            {product.category || product.description}
                        </span>

                        {/* Rating */}
                        <div className="d-flex align-items-center mb-1">
                            <div className="text-warning me-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        size={16}
                                        color={i < product.rating ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </div>
                            {product.ratingCount !== undefined && (
                                <small className="text-muted fw-semibold">({product.ratingCount})</small>
                            )}
                        </div>
                        {/* Price */}
                        <div>
                            <span className="fw-bold text-success fs-5 me-2">
                                ₹{product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-muted text-decoration-line-through me-2">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                            {product.discount && (
                                <span className="text-danger fw-semibold">
                                    {product.discount} off
                                </span>
                            )}
                        </div>

                        {/* Delivery */}
                        <span className="small mb-1">
                            <strong className="me-2">Secure delivery by</strong>
                            <span className="text-success">21 May, Wednesday</span>
                        </span>

                        {/* Offers */}
                        <section>
                            <h6 className="fw-bold">Available Offers</h6>
                            <ul className="small ps-3">
                                <li>
                                    5% Unlimited Cashback on Flipkart Axis Bank Credit Card
                                </li>
                                <li>10% off on Axis Bank EMI Transactions</li>
                                <li>Extra 79% off included in price</li>
                                <li>+7 more offers</li>
                            </ul>
                        </section>
                        {/* Specifications */}
                        <section>
                            <h6 className="fw-bold mb-2">Specifications</h6>
                            <table className="table table-bordered small">
                                <tbody>
                                    {product.brand && (
                                        <tr>
                                            <th className="bg-light">Brand</th>
                                            <td>{product.brand}</td>
                                        </tr>
                                    )}
                                    {product.ram && (
                                        <tr>
                                            <th className="bg-light">RAM</th>
                                            <td>{product.ram}</td>
                                        </tr>
                                    )}
                                    {product.rom && (
                                        <tr>
                                            <th className="bg-light">Storage</th>
                                            <td>{product.rom}</td>
                                        </tr>
                                    )}
                                    {product.operatingSystem && (
                                        <tr>
                                            <th className="bg-light">Operating System</th>
                                            <td>{product.operatingSystem}</td>
                                        </tr>
                                    )}
                                    {product.cpuModel && (
                                        <tr>
                                            <th className="bg-light">CPU Model</th>
                                            <td>{product.cpuModel}</td>
                                        </tr>
                                    )}
                                    {product.cpuSpeed && (
                                        <tr>
                                            <th className="bg-light">CPU Speed</th>
                                            <td>{product.cpuSpeed}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>

                        {/* Services */}
                        <section className="mb-3">
                            <h6 className="fw-bold mb-2">Services</h6>
                            <ul className="small ps-3">
                                <li>
                                    1 Year Warranty{" "}
                                    <a href="#" className="text-decoration-underline">
                                        Know More
                                    </a>
                                </li>
                                <li>Cash on Delivery available</li>
                                <li>7 Days Replacement Policy</li>
                                <li>GST invoice available</li>
                            </ul>
                        </section>

                        {/* Description */}
                        <section className="mb-3">
                            <h6 className="fw-bold mb-2">Description</h6>
                            <p
                                className="small text-secondary"
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {product.description || "NA."}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* Fixed bottom buttons for mobile */}
            <div className="d-md-none fixed-bottom bg-white p-2 border-top shadow">
                <div className="d-flex gap-2">
                    <button className="btn btn-warning w-50 fw-semibold" onClick={handleAddToCart}>
                        <i className="bi bi-cart3 me-2"></i>Add to Cart
                    </button>
                    <button className="btn btn-danger w-50 fw-semibold">
                        <i className="bi bi-lightning-fill me-2"></i>Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
