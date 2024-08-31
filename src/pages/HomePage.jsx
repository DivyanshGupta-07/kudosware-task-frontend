import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to YourHR</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default HomePage;
