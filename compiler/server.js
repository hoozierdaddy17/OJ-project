const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");
const { executeJava } = require("./executeJava");
const cors = require("cors");
const submitProblem = require("./submit");

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined || !code) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  if (!input) {
    return res.status(400).json({ error: "Input is required." });
  }
  try {
    // Generate code file
    const filePath = await generateFile(language, code);

    // Generate input file
    const inputPath = await generateInputFile(input);

    // Define the execution function based on the language
    let executeFunction;
    switch (language) {
      case "cpp":
        executeFunction = executeCpp;
        break;
      case "python":
        executeFunction = executePython;
        break;
      case "java":
        executeFunction = executeJava;
        break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }

    // Execute code with input
    const output = await executeFunction(filePath, inputPath);

    // Send response with file paths and output
    res.json({ filePath, inputPath, output });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/", submitProblem);

app.listen(7500, () => {
  console.log("Server is listening on port 7500!");
});
