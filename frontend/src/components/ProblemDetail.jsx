import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(
    '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}'
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/problems/${id}`
        );
        const data = response.data;
        setProblem(data);
      } catch (error) {
        setError("Problem not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:7500/run", {
        language: "cpp",
        code: code,
        input: input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7000/problems/${id}/submit`,
        {
          language: "cpp",
          code: code,
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error submitting code:", error);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Problem Description */}
      <div className="lg:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
          <p className="text-gray-700 mb-4">{problem.description}</p>

          <h3 className="text-lg font-bold mb-2">Sample Test Cases</h3>
          {problem.sampleTestCases && problem.sampleTestCases.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {problem.sampleTestCases.map((testCase, index) => (
                <div key={index} className="py-4">
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">Input:</span> {testCase.input}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Output:</span> {testCase.output}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No sample test cases available.</p>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="lg:w-1/2">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Code Editor</h3>
          <Editor
            height="400px"
            defaultLanguage="cpp"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />

          {/* Input/Output */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Input</h3>
            <textarea
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here"
            ></textarea>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Output</h3>
            <textarea
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              readOnly
              value={output}
              placeholder="Output will be displayed here"
            ></textarea>
          </div>

          {/* Run/Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleRunCode}
            >
              Run Code
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {/* Display Results */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Test Results</h3>
            {results && results.length > 0 ? (
              <div>
                {results.map((result, index) => (
                  <div key={index} className="py-4">
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Input:</span> {result.input}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Expected Output:</span>{" "}
                      {result.expectedOutput}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Actual Output:</span>{" "}
                      {result.actualOutput}
                    </p>
                    {result.passed ? (
                      <span className="text-green-500">✔️</span>
                    ) : (
                      <span className="text-red-500">❌</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No test results available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
