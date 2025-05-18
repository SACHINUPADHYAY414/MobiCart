import Ellipses from "../../utills/Ellipses.jsx";
import { FaStar } from "react-icons/fa";
import { loaderImage } from "../../utills/Constrant";


const ProductCard = ({ product, selectProduct }) => {

  return (
    <div className="card h-100 shadow-sm product-card mx-auto shadow-md" style={{ maxWidth: "280px" }} onClick={() => selectProduct(product)}>
      <img
        src={product.images && product.images.length > 0 ? product.images[0] : 'fallback-image-url.jpg'}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = loaderImage;
        }}
        style={{ height: "220px", objectFit: "contain", padding: "10px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title" title={product.name}>
          <Ellipses text={product.name} maxChars={40} />
        </h5>

        <div className="mb-2">
          <>
            <span className="fw-bold text-danger">₹{product.price}</span>
            <span className="text-muted text-decoration-line-through ms-2">{product.originalPrice}</span>
          </>
          <span className="fw-bold text-success"></span>
        </div>

        {/* Rating */}
        <div className="d-flex align-items-center mb-3">
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
      </div>
    </div>
  );
};

export default ProductCard;
