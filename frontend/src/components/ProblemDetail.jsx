// ProblemDetail.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ProblemDetail = ({ problemId }) => {
  const [problem, setProblem] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/problem/${problemId}`
        );
        setProblem(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:7000/compiler`, {
        problemId,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error submitting solution:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <p className="text-gray-700 mb-4">{problem.description}</p>

      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="input" className="block mb-2">
          Input:
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full border p-2 mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {output && (
        <div>
          <h2 className="text-xl font-bold mb-2">Output:</h2>
          <p className="text-gray-700 mb-4">{output}</p>
        </div>
      )}

      {/* Integrate your compiler component here */}
      {/* <CompilerComponent problemId={problemId} /> */}
    </div>
  );
};

ProblemDetail.propTypes = {
  problemId: PropTypes.string.isRequired,
};

export default ProblemDetail;
