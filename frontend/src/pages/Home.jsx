import { useEffect, useState } from "react";
import { FiCode, FiSearch, FiAward } from "react-icons/fi";
import ProgrammerBG from "../images/ProgrammerBG.png";

const Home = () => {
  const [words] = useState(["C++", "Python", "Java", "C"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === words.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="relative mx-8">
      {/* Algo Arena Text and Description */}
      <div className="text-center p-8">
        <h2 className="text-5xl font-bold mb-4 text-cyan-700">
          Welcome to <span className="text-green-600">Algo Arena</span>
        </h2>
        <p className="text-2xl mt-4 text-gray-700">
          <span className="text-cyan-700">Practice</span> and{" "}
          <span className="text-cyan-700">improve</span> your{" "}
          <span className="text-cyan-700">coding skills</span> with our{" "}
          <span className="text-cyan-700">curated problems</span>.
        </p>
      </div>

      {/* Type Animation and Bg pic */}
      <div className="flex mt-8">
        {/* Type Animation on Left */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-8xl font-bold text-cyan-700 mb-8">
            <div className="wrapper">
              <div className="static-txt">Code in</div>
              <ul className="dynamic-txts">
                <li>
                  <span className="text-8xl font-bold text-green-600">
                    {words[currentIndex]}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bg pic on right*/}
        <div className="w-1/2">
          <img
            src={ProgrammerBG}
            alt="Algo Arena Image"
            className="w-full rounded-lg"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>
      </div>

      {/* Banner with the text "Practice and improve your coding skills with our curated problems" */}
      <div className="bg-green-600 text-white text-center py-4 text-lg tracking-wide">
        Embark on a coding journey with our carefully crafted challenges!{" "}
      </div>

      {/* Horizontal Bar with Feature Boxes */}
      <div className="flex justify-center mt-12">
        {/* Feature Boxes */}
        <div className="w-full flex justify-between">
          {/* Problem Solving */}
          <div className="w-1/3 p-6 border rounded-lg shadow-lg mb-8 mr-4">
            <FiCode className="text-5xl mb-6 text-cyan-700" />
            <h3 className="text-3xl font-bold mb-4">Problem Solving</h3>
            <p className="text-xl text-gray-700">
              Solve problems of different difficulties to improve your coding
              skills.
            </p>
          </div>

          {/* Search Functionality */}
          <div className="w-1/3 p-6 border rounded-lg shadow-lg mb-8 mr-4">
            <FiSearch className="text-5xl mb-6 text-cyan-700" />
            <h3 className="text-3xl font-bold mb-4">Search Problems</h3>
            <p className="text-xl text-gray-700">
              Search for problems by name to find specific challenges.
            </p>
          </div>

          {/* Leaderboard */}
          <div className="w-1/3 p-6 border rounded-lg shadow-lg mb-8">
            <FiAward className="text-5xl mb-6 text-cyan-700" />
            <h3 className="text-3xl font-bold mb-4">Leader Board</h3>
            <p className="text-xl text-gray-700">
              See how you rank against other users on the leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
