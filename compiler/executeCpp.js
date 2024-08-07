const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
// const __dirname = path.resolve();

const executeCpp = async (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const jobOutputDir = path.join(__dirname, "codes/cpp");
  // const outputFilename = "output.txt";
  // const outPath = path.join(jobOutputDir, outputFilename);
  const exePath = path.join(jobOutputDir, `${jobId}.out`);

  // Create job-specific directory if it doesn't exist
  if (!fs.existsSync(jobOutputDir))
    fs.mkdirSync(jobOutputDir, { recursive: true });

  const output = new Promise((resolve, reject) => {
    const fullCommand = `g++ ${filePath} -o ${exePath} && cd ${jobOutputDir} && ./${jobId}.out < ${inputPath}`;
    console.log(fullCommand);

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Execution error: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Execution error: ${stderr}`));
      } else {
        resolve(stdout);
        }
      })
  });
  return output;
};

module.exports = {
  executeCpp,
};
