import React from "react";

const ProblemDescription = () => {
  // Manual problem description (replace with actual fetched data)
  const problem = {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat:
      "The input is an array of integers nums and an integer target.",
    outputFormat:
      "Return an array containing indices of the two numbers such that they add up to target.",
    constraints:
      "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    exampleInput: "[2,7,11,15], 9",
    exampleOutput: "[0,1]",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 gap-8">
        {/* Left Half */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Problem Description</h2>
            <p>{problem.description}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Input Format</h2>
            <p>{problem.inputFormat}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Output Format</h2>
            <p>{problem.outputFormat}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Constraints</h2>
            <p>{problem.constraints}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Example</h2>
            <div className="border border-gray-300 rounded-md p-4 mt-2">
              <div className="text-sm font-medium text-gray-600 mb-1">
                Input
              </div>
              <code className="text-xs bg-gray-200 p-2 rounded-md block">
                {problem.exampleInput}
              </code>
              <div className="text-sm font-medium text-gray-600 mt-4 mb-1">
                Output
              </div>
              <code className="text-xs bg-gray-200 p-2 rounded-md block">
                {problem.exampleOutput}
              </code>
            </div>
          </div>
        </div>
        {/* Right Half */}
        <div>
          {/* Console Layout */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Console</h2>
            {/* Add console layout here */}
          </div>
          {/* Input/Output Box */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Input/Output Box</h2>
            {/* Add input/output box here */}
          </div>
          {/* Submit and Run Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold mb-2">Submit and Run</h2>
            {/* Add submit and run buttons here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
