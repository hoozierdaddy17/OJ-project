const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeJava = async (filePath, inputPath) => {
  // Extract class name and output directory
  const className = filePath.split(".")[0]; // e.g., Main
  // const className = path.basename(filePath, ".java");
  const jobOutputDir = path.join(__dirname, "codes/java");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(jobOutputDir)) {
    fs.mkdirSync(jobOutputDir, { recursive: true });
  }

  // Create full paths
  const classFilePath = path.join(jobOutputDir, `${className}.class`);

  const output = new Promise((resolve, reject) => {
    // Full command to compile and run Java code
    const command = `java ${filePath} < ${inputPath}`;
    //java execution -> takes .java file name and compiles into java class (binary executable file (machine readable))
    //actual code inside main.java --> converted to machine readable form (byte code) stored in main.class -> gets executed by java

    // console.log(output);

    exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
  return output;
};

module.exports = {
  executeJava,
};
