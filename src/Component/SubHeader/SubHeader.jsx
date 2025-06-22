
const categories = [
    "All",
    "New Releases",
    "Earbuds",
    "Computers",
    "Mobiles",
];

const SubHeader = ({ localCategory, setLocalCategory, setSelectedCategory }) => {
    const handleCategoryClick = (category) => {
        setLocalCategory(category);
        setSelectedCategory(category);
    };

    return (
        <div className="text-white px-3 py-2 w-100" style={{ backgroundColor: "#232f3e" }}>
            <div className="container">
                <div className="d-flex flex-wrap overflow-auto">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleCategoryClick(category)}
                            className={`btn btn-link text-decoration-none me-3 p-0 ${localCategory === category ? "text-warning fw-bold" : "text-white"
                                }`}
                            style={{ whiteSpace: "nowrap" }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
