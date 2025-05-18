import { useState, useEffect } from "react";
import Layout from "../../Page/Layout/Layout";

const slides = [
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/002/058/986/non_2x/online-shopping-store-on-website-and-mobile-phone-design-smart-business-marketing-concept-horizontal-view-illustration-free-vector.jpg",
    alt: "Shopping Mall Poster",
  },
  {
    id: 2,
    imageUrl:
      "https://fastknowers.com/wp-content/uploads/2021/07/phone-screen.jpg",
    alt: "Smartphone",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/001/925/571/large_2x/online-shopping-store-on-website-and-mobile-phone-design-smart-business-marketing-concept-horizontal-view-illustration-vector.jpg",
    alt: "Headphones",
  },
];

const Carousel = ({ selectedCategory, searchQuery, setSelectedCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-100">
      <div
        className="carousel w-100"
        style={{
          overflow: "hidden",
          height: "90vh",
          position: "relative",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="carousel-item"
            style={{
              display: index === currentIndex ? "block" : "none",
              height: "90vh",
            }}
          >
            <img
              src={slide.imageUrl}
              className="d-block w-100"
              style={{
                height: "90vh",
                objectFit: "cover",
              }}
              alt={slide.alt}
            />
          </div>
        ))}
      </div>

      {/* Layout rendered below carousel */}
      <Layout
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Carousel;
