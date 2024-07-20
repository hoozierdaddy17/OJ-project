const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCpp } = require("./executeCpp");
const cors = require("cors");

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

    // Execute code with input
    const output = await executeCpp(filePath, inputPath);

    // Send response with file paths and output
    res.json({ filePath, inputPath, output });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.listen(7500, () => {
  console.log("Server is listening on port 7500!");
});
