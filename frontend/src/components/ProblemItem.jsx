import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const difficultyColors = {
  Easy: "bg-green-300 text-green-800",
  Medium: "bg-yellow-300 text-yellow-800",
  Hard: "bg-red-300 text-red-800",
};

const ProblemItem = ({
  problem,
  setEditProblem,
  setActive,
  isAdmin,
  fetchProblems,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditProblem(problem);
    setActive(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/problems/${problem._id}`);
      fetchProblems();
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const navigateToProblem = () => {
    navigate(`/problems/${problem._id}`);
  };

  return (
    <div className="flex justify-between items-start p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <h3
            className="text-xl font-bold cursor-pointer hover:text-blue-600 mr-2"
            onClick={navigateToProblem}
          >
            {problem.title}
          </h3>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              difficultyColors[problem.difficulty] ||
              "bg-gray-200 text-gray-800"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-gray-700 mb-2">{problem.description}</p>
        <div className="flex flex-wrap gap-2">
          {(problem.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {isAdmin && (
        <div className="flex space-x-2 items-center">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition-colors"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors"
          >
            <FaTrash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

ProblemItem.propTypes = {
  problem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(["Easy", "Medium", "Hard"]).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string), // tags can be undefined
  }).isRequired,
  setEditProblem: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  fetchProblems: PropTypes.func.isRequired,
};

export default ProblemItem;
