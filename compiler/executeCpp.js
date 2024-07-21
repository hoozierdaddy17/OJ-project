const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// const __dirname = path.resolve();

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const executeCpp = (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFilename = `${jobId}.exe`;
  const outPath = path.join(outputPath, outputFilename);

  // Verify paths
  console.log("Source file:", filePath);
  console.log("Input file:", inputPath);
  console.log("Output file:", outPath);

  // Check file existence
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error(`Source file not found: ${filePath}`));
  }
  if (!fs.existsSync(inputPath)) {
    return Promise.reject(new Error(`Input file not found: ${inputPath}`));
  }

  return new Promise((resolve, reject) => {
    const command = `g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && "${outputFilename}"`;
    const fullCommand = `${command} < "${inputPath}"`;

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
