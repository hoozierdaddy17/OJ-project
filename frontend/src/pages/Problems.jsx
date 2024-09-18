import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProblemList from "../components/ProblemList";
import CreateProblem from "../components/CreateProblem";
import { UserContext } from "../App";

const Problems = () => {
  const [editProblem, setEditProblem] = useState(null);
  const [active, setActive] = useState(false);
  const { user } = useContext(UserContext);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProblems = async () => {
      // Replace with your API call to fetch problems
      const response = await fetch(`${import.meta.env.VITE_RAILWAY_BACKEND_URL}/problems`);
      const data = await response.json();
      setProblems(data);
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "";
    if (query.trim()) {
      setFilteredProblems(problems.filter(problem =>
        problem.title.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredProblems(problems);
    }
  }, [location.search, problems]);

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-screen">
      <div className="lg:w-1/4 p-4 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">User Panel</h2>
        <ul>
          {user?.role === "admin" && (
            <li className="mb-2">
              <button
                onClick={() => {
                  setEditProblem(null);
                  setActive(true);
                }}
                className="w-full text-left p-2 bg-blue-500 text-white rounded"
              >
                Create Problem
              </button>
            </li>
          )}
          <li className="mb-2">
            <button
              onClick={() => setActive(false)}
              className="w-full text-left p-2 bg-blue-500 text-white rounded"
            >
              Problems List
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {active ? (
          <CreateProblem
            problem={editProblem}
            onCancel={() => setActive(false)}
          />
        ) : (
          <ProblemList
            problems={filteredProblems}
            setEditProblem={(problem) => {
              setEditProblem(problem);
              setActive(true);
            }}
            setActive={setActive}
          />
        )}
      </div>
    </div>
  );
};

export default Problems;
