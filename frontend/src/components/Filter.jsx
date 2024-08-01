import PropTypes from "prop-types";
import { useState } from "react";

const Filter = ({ onFilter }) => {
  const [difficulty, setDifficulty] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    onFilter(e.target.value, selectedTags);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
      onFilter(difficulty, newTags);
      return newTags;
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Filters</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="flex items-center mb-4 lg:mb-0">
          <label
            htmlFor="difficulty"
            className="mr-2 text-gray-800 font-semibold"
          >
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-800"
          >
            <option value="All">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Binary Search", "Array", "Dynamic Programming"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-2 rounded-lg font-semibold border ${
                selectedTags.includes(tag)
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-gray-300 text-gray-800 border-gray-400"
              } transition-colors duration-200`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
