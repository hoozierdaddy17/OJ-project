import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <div>
        <h3
          className="text-xl font-bold mb-2 cursor-pointer"
          onClick={navigateToProblem}
        >
          {problem.title}
        </h3>
        <p className="text-gray-700">{problem.description}</p>
      </div>
      {isAdmin && (
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
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
  }).isRequired,
  setEditProblem: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  fetchProblems: PropTypes.func.isRequired,
};

export default ProblemItem;
