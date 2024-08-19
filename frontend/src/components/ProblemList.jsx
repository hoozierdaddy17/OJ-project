import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ProblemItem from "./ProblemItem";
import axios from "axios";
import Filter from "./Filter";
import { UserContext } from "../App";

const ProblemList = ({ setEditProblem, setActive }) => {
  const { user } = useContext(UserContext);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [tags, setTags] = useState([]);

  // console.log(problems);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:7000/problems");
      setProblems(response.data);
      setFilteredProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleFilter = (selectedDifficulty, selectedTags) => {
    setDifficulty(selectedDifficulty);
    setTags(selectedTags);

    let filtered = problems;

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    console.log(problems);
    console.log(filtered);
    console.log(selectedDifficulty);

    if (selectedTags.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedTags.every((tag) => problem.problemTags.includes(tag))
      );
    }

    setFilteredProblems(filtered);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Problem List</h1>
      <Filter onFilter={handleFilter} />
      <ul className="space-y-4">
        {filteredProblems.map((problem) => (
          <li key={problem._id}>
            <ProblemItem
              problem={problem}
              setEditProblem={setEditProblem}
              setActive={setActive}
              isAdmin={user?.isAdmin} // Access isAdmin from user context
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
};

ProblemList.defaultProps = {
  setEditProblem: () => {},
  setActive: () => {},
};

export default ProblemList;
