const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

// middleware:

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined)
    return res.status(400).json({ success: false, error: "Empty code body!" });

  //   step1 1: generate C++ file with content from request
  const filePath = await generateFile(language, code);
  const output = await executeCpp(filePath);

  // step 2: run the file and send response

  return res.json({ filePath, output });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
