import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  moveToSaved,
  removeFromSaved,
  moveToCart,
} from "../../redux/cartSlice";
import { loaderImage } from "../../utills/Constrant";
import Ellipses from "../../utills/Ellipses";
import { FaStar, FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const AddToCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const savedItems = useSelector((state) => state.cart.savedItems);

  const renderProductCard = (item, isCart = true) => (
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
          <strong>
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
              <small className="text-muted fw-semibold">
                ({item.ratingCount})
              </small>
            )}
          </div>
          <div className="d-flex align-items-center gap-2 mt-1">
            <span className="fw-semibold">Item: {item.quantity}</span>
            {isCart && item.quantity > 1 && (
              <FaMinusSquare
                className="text-danger"
                onClick={() => dispatch(decreaseQuantity(item.id))}
                style={{ cursor: "pointer" }}
              />
            )}
            {isCart && (
              <FaPlusSquare
                className="text-success"
                onClick={() => dispatch(increaseQuantity(item.id))}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <small>
            Price: ₹{item.price}{" "}
            <del className="text-muted">₹{item.originalPrice}</del>{" "}
            <span className="text-success">{item.discount}</span>
          </small>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end mt-3 mt-md-0">
        {isCart ? (
          <>
            <button
              className="btn btn-sm btn-outline-secondary mb-2"
              onClick={() => dispatch(moveToSaved(item.id))}
            >
              Save for later
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-primary mb-2"
              onClick={() => dispatch(moveToCart(item.id))}
            >
              Move to cart
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch(removeFromSaved(item.id))}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </li>
  );

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Your Cart</h4>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">{cartItems.map((item) => renderProductCard(item))}</ul>

          {/* Price Details Card */}
          <div className="mt-3 row justify-content-end">
            <div className="col-md-5">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-3">Price Details</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Price ({totalQuantity} items)</span>
                  <span>₹{totalOriginalPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">- ₹{totalDiscount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
                <hr />
                <div className="text-success fw-semibold">
                  You will save ₹{totalDiscount} on this order
                </div>
                <button className="btn btn-success w-100 mt-3">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {savedItems.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3">Saved For Later ({savedItems.length})</h5>
          <ul className="list-group">
            {savedItems.map((item) => renderProductCard(item, false))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
