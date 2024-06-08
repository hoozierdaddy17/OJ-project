import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProblemItem = ({ problem }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <Link to={`/problems/${problem.id}`}>
        <h3 className="text-xl font-bold">{problem.title}</h3>
        <p>Difficulty: {problem.difficulty}</p>
      </Link>
    </div>
  );
};

ProblemItem.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProblemItem;
