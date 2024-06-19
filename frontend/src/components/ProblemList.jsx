import ProblemItem from "./ProblemItem";

const ProblemList = () => {
  // Problem data
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Palindrome Number",
      difficulty: "Easy",
    },
    {
      id: 4,
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
    },
  ];

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemItem key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemList;
