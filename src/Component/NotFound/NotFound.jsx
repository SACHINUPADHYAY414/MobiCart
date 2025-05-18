import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
<div className="container-fluid">
<div
  className="d-flex justify-content-center align-items-center"
>
  <div className="text-center p-2">
        <h1 className="display-1 text-danger mb-3">404</h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="mb-4 fs-5">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary btn-lg shadow"
        >
          Go to Home
        </button>
      </div>
    </div>
</div>
  );
};

export default NotFound;
