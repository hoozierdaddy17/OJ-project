import { useState } from "react";
import ProblemList from "../components/ProblemList";
import CreateProblem from "../components/CreateProblem";

const Problems = () => {
  const [editProblem, setEditProblem] = useState(null);
  const [active, setActive] = useState(false);
  const isAdmin = true; // Replace with actual admin check from auth state

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-screen">
      <div className="lg:w-1/4 p-4 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
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
            setEditProblem={(problem) => {
              setEditProblem(problem);
              setActive(true);
            }}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default Problems;
