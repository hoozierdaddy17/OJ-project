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
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Difficulty Filter */}
        <div className="flex items-center mb-6 lg:mb-0 pr-4">
          {" "}
          {/* Adjusted margin-bottom */}
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

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mt-6">
          {" "}
          {/* Added margin-top */}
          {[
            "Binary Search",
            "Array",
            "Dynamic Programming",
            "Strings",
            "Two Pointers",
            "Sliding Window",
            "Topo Sorting",
            "Graphs",
            "Math",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-2 py-1 rounded-lg font-semibold border ${
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
