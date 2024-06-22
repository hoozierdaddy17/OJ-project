import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProblemItem from "./ProblemItem";
import axios from "axios";

const ProblemList = ({ setEditProblem, setActive, isAdmin }) => {
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:7000/problem");
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Problem List</h1>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li key={problem._id}>
            <ProblemItem
              problem={problem}
              setEditProblem={setEditProblem}
              setActive={setActive}
              isAdmin={isAdmin}
              fetchProblems={fetchProblems}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ProblemList.propTypes = {
  setEditProblem: PropTypes.func,
  setActive: PropTypes.func,
  isAdmin: PropTypes.bool,
};

ProblemList.defaultProps = {
  setEditProblem: () => {},
  setActive: () => {},
  isAdmin: false,
};

export default ProblemList;
