import Ellipses from "../../utills/Ellipses";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { loaderImage } from "../../utills/Constrant";
import { FaStar, FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const AddToCart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Your Cart</h4>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center cart-item"
                            >
                                <div className="d-flex align-items-center gap-3 flex-grow-1">
                                    <img
                                        src={item.image || item.images?.[0]}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = loaderImage;
                                        }}
                                        alt={item.name}
                                        style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                    />
                                    <div>
                                        <strong
                                        >
                                            <Ellipses text={item.name} maxChars={50} />
                                        </strong>
                                        <br />
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="text-warning me-2">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        size={16}
                                                        color={i < item.rating ? "#ffc107" : "#e4e5e9"}
                                                    />
                                                ))}
                                            </div>
                                            {item.ratingCount !== undefined && (
                                                <small className="text-muted fw-semibold">({item.ratingCount})</small>
                                            )}
                                        </div>
                                        <div className="d-flex align-items-center gap-2 mt-1">
                                            <span className="fw-semibold"> Item : {item.quantity} </span>
                                            {item.quantity > 1 && (
                                                <FaMinusSquare className="text-danger" onClick={() => dispatch(decreaseQuantity(item.id))} />
                                            )}

                                            <FaPlusSquare className="text-success" onClick={() => dispatch(increaseQuantity(item.id))} />
                                        </div>

                                        <small>Price: ₹{item.price}</small>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-sm btn-danger mt-3 mt-md-0"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Total */}
                    <div className="mt-3">
                        <h5>
                            Total: ₹
                            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                        </h5>
                        <button className="btn btn-success mt-2">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddToCart;
