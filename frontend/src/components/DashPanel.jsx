import React, { useState } from "react";
import ProblemList from "./ProblemList";
import CreateProblem from "./CreateProblem";
import DashSubmissions from "./DashSubmissions";
import { Button } from "@/components/ui/button";

const DashPanel = () => {
  const [active, setActive] = useState("problems");
  const [editProblem, setEditProblem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100">
        <Button onClick={toggleRole} className="mb-4">
          {isAdmin ? "Switch to User" : "Switch to Admin"}
        </Button>
        <ul>
          <li>
            <Button
              onClick={() => setActive("problems")}
              className="w-full mb-2"
            >
              View All Problems
            </Button>
          </li>
          {isAdmin && (
            <>
              <li>
                <Button
                  onClick={() => setActive("create")}
                  className="w-full mb-2"
                >
                  Create Problem
                </Button>
              </li>
            </>
          )}
          <li>
            <Button
              onClick={() => setActive("submissions")}
              className="w-full mb-2"
            >
              Check All Submissions
            </Button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {active === "problems" && (
          <ProblemList
            setEditProblem={setEditProblem}
            setActive={setActive}
            isAdmin={isAdmin}
          />
        )}
        {active === "create" && <CreateProblem />}
        {active === "edit" && <CreateProblem editProblem={editProblem} />}
        {active === "submissions" && (
          <DashSubmissions problem={editProblem?._id} />
        )}
      </div>
    </div>
  );
};

export default DashPanel;
