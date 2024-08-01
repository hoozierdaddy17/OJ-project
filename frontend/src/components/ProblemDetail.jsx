import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Cookies from "js-cookie"; // Assuming you use js-cookie to handle tokens

const ProblemDetail = ({ user }) => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [language, setLanguage] = useState("cpp");

  // Default code snippets for different languages
  const defaultCodeSnippets = {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    python: 'print("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  };

  useEffect(() => {
    setCode(defaultCodeSnippets[language] || "");
  }, [language]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/problems/${id}`
        );
        setProblem(response.data);
      } catch (error) {
        setError("Problem not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleRunCode = async () => {
    setIsRunningCode(true);
    try {
      const response = await axios.post("http://localhost:7500/run", {
        language,
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(
        error.response ? error.response.data.error : "An error occurred"
      );
    } finally {
      setIsRunningCode(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResults([]);
    setVerdict(null);

    const problemId = problem._id;

    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        "http://localhost:7000/submissions",
        {
          problemId,
          language,
          code,
          hiddenTestCases: problem.hiddenTestCases,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data.results);
      setVerdict(response.data.verdict);
    } catch (error) {
      console.error("Error submitting code:", error);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
      }
    } finally {
      setIsSubmitting(false);
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
          <div className="mb-4">
            {/* Language Selection */}
            <label htmlFor="language" className="block font-bold mb-2">
              Select Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          <h3 className="text-lg font-bold mb-4">Code Editor</h3>
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              onClick={handleRunCode}
              disabled={isRunningCode}
            >
              {isRunningCode ? (
                <div className="flex items-center">
                  <span className="mr-2">Running...</span>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Run Code"
              )}
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <span className="mr-2">Submitting...</span>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Submit Code"
              )}
            </button>
          </div>

          {/* Display Results */}
          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Test Results</h3>
              <div className="flex flex-wrap gap-2">
                {results.map((result, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded ${
                      result.passed
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {`Case ${index + 1} ${result.passed ? "passed" : "failed"}`}
                  </button>
                ))}
              </div>
              {verdict && (
                <div className="mt-6 flex items-center">
                  <p className="text-lg font-bold mr-2">Verdict:</p>
                  <span
                    className={`${
                      verdict === "Accepted"
                        ? "text-xl font-bold text-green-500"
                        : "text-xl font-bold text-red-500"
                    }`}
                  >
                    {verdict}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProblemDetail.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProblemDetail;
