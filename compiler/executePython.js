const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
// const __dirname = path.resolve();

const executePython = async (filePath, inputPath) => {

  const output = new Promise((resolve, reject) => {
    const fullCommand = `python ${filePath} < ${inputPath}`;
    console.log(fullCommand);

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Execution error: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Execution error: ${stderr}`));
      } else {
        resolve(stdout);
      }
    });
  });
  return output;
};

module.exports = {
  executePython,
};
