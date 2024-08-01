const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeJava = async (filePath, inputPath) => {
  const jobId = path.basename(filePath, ".java"); // Remove .java extension
  const jobOutputDir = path.join(__dirname, "codes/java");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(jobOutputDir))
    fs.mkdirSync(jobOutputDir, { recursive: true });

  return new Promise((resolve, reject) => {
    // Full command to compile and run Java code
    const compileCommand = `javac ${filePath} -d ${jobOutputDir}`;
    const runCommand = `java -cp ${jobOutputDir} ${jobId} < ${inputPath}`;

    // Execute commands
    exec(`${compileCommand} && ${runCommand}`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(new Error(`Execution error: ${stderr || error.message}`));
      } else {
        resolve(stdout);
      }

      // Clean up class file after execution
      fs.unlink(path.join(jobOutputDir, `${jobId}.class`), (err) => {
        if (err) console.error(`Error deleting file: ${jobId}.class`, err);
      });
    });
  });
};

module.exports = {
  executeJava,
};
