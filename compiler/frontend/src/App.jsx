import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setOutput("");
    const payload = { language, code, input };

    try {
      const { data } = await axios.post("http://localhost:7500/run", payload);
      setOutput(data.output);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
          <option value="c">C</option>
        </select>
      </div>
      <textarea
        rows="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      ></textarea>
      <textarea
        rows="5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your input here..."
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{output}</code>
      </pre>
    </div>
  );
}

export default App;
