import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="text-center p-8">
      <h2 className="text-4xl font-bold mb-4">Welcome to Algo Arena</h2>
      <p className="text-lg">
        Practice and improve your coding skills with our curated problems.
      </p>

      <div>
        <Link to="/problems">
          <button className="mt-4 bg-cyan-900 text-white py-2 px-4 rounded-full shadow-lg hover:bg-cyan-800">
            Start Practicing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
