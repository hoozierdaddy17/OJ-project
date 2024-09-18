import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CreateProblem = ({ problem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "easy",
    description: "",
    problemTags: "",
    sampleTestCases: [{ input: "", output: "" }],
    hiddenTestCases: [{ input: "", output: "" }],
  });

  useEffect(() => {
    if (problem) {
      setFormData({
        title: problem.title,
        difficulty: problem.difficulty,
        description: problem.description,
        problemTags: problem.problemTags.join(", "),
        sampleTestCases: problem.sampleTestCases,
        hiddenTestCases: problem.hiddenTestCases,
      });
    }
  }, [problem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (index, field, key, value) => {
    const testCases = [...formData[field]];
    testCases[index][key] = value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: testCases,
    }));
  };

  const addTestCase = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { input: "", output: "" }],
    }));
  };

  const removeTestCase = (field, index) => {
    const testCases = [...formData[field]];
    testCases.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [field]: testCases,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      problemTags: formData.problemTags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (problem) {
        await axios.put(
          `${import.meta.env.VITE_RAILWAY_BACKEND_URL}/problems/${problem._id}`,
          payload
        );
        console.log("Problem updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_RAILWAY_BACKEND_URL}/problems/create`, payload);
        console.log("Problem created successfully");
      }
      onCancel();
    } catch (error) {
      console.error(
        "Error submitting problem:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="block text-gray-700 font-bold mb-2"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="problemTags"
            className="block text-gray-700 font-bold mb-2"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="problemTags"
            name="problemTags"
            value={formData.problemTags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Sample Test Cases</h3>
          {formData.sampleTestCases.map((testCase, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <textarea
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(
                    index,
                    "sampleTestCases",
                    "input",
                    e.target.value
                  )
                }
                className="flex-1 p-2 border rounded"
                placeholder="Input"
                rows="2"
              />
              <textarea
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(
                    index,
                    "sampleTestCases",
                    "output",
                    e.target.value
                  )
                }
                className="flex-1 p-2 border rounded"
                placeholder="Output"
                rows="2"
              />
              <button
                type="button"
                onClick={() => removeTestCase("sampleTestCases", index)}
                className="text-red-700 hover:text-red-900"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTestCase("sampleTestCases")}
            className="bg-green-700 text-white p-2 rounded hover:bg-green-800"
          >
            Add Sample Test Case
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Hidden Test Cases</h3>
          {formData.hiddenTestCases.map((testCase, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <textarea
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(
                    index,
                    "hiddenTestCases",
                    "input",
                    e.target.value
                  )
                }
                className="flex-1 p-2 border rounded"
                placeholder="Input"
                rows="2"
              />
              <textarea
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(
                    index,
                    "hiddenTestCases",
                    "output",
                    e.target.value
                  )
                }
                className="flex-1 p-2 border rounded"
                placeholder="Output"
                rows="2"
              />
              <button
                type="button"
                onClick={() => removeTestCase("hiddenTestCases", index)}
                className="text-red-700 hover:text-red-900"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTestCase("hiddenTestCases")}
            className="bg-green-700 text-white p-2 rounded hover:bg-green-800"
          >
            Add Hidden Test Case
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            {problem ? "Update Problem" : "Create Problem"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-700 text-white p-2 rounded ml-2 hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

CreateProblem.propTypes = {
  problem: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    difficulty: PropTypes.string,
    description: PropTypes.string,
    problemTags: PropTypes.arrayOf(PropTypes.string),
    sampleTestCases: PropTypes.arrayOf(
      PropTypes.shape({
        input: PropTypes.string,
        output: PropTypes.string,
      })
    ),
    hiddenTestCases: PropTypes.arrayOf(
      PropTypes.shape({
        input: PropTypes.string,
        output: PropTypes.string,
      })
    ),
  }),
  onCancel: PropTypes.func.isRequired,
};

CreateProblem.defaultProps = {
  problem: null,
};

export default CreateProblem;
