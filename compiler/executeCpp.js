const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeCpp = (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const jobOutputDir = path.join(__dirname, "temp", "submission", jobId); // Correct path
  const outputFilename = "output.txt";
  const outPath = path.join(jobOutputDir, outputFilename);
  const exePath = path.join(jobOutputDir, `${jobId}.exe`);

  // Create job-specific directory if it doesn't exist
  if (!fs.existsSync(jobOutputDir))
    fs.mkdirSync(jobOutputDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const compileCommand = `g++ ${filePath} -o ${exePath}`;
    const runCommand = `${exePath} < ${inputPath} > ${outPath}`;
    const fullCommand = `${compileCommand} && ${runCommand}`;

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Execution error: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Execution error: ${stderr}`));
      } else {
        fs.readFile(outPath, "utf8", (err, data) => {
          if (err) {
            reject(new Error(`Failed to read output file: ${err.message}`));
          } else {
            resolve(data);
          }
        });
      }
    });
  });
};

module.exports = {
  executeCpp,
};
