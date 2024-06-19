const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const executeCpp = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0]; 
  const outputFilename = `${jobId}.exe`;
  const outPath = path.join(outputPath, outputFilename);


  return new Promise((resolve, reject) => {
    const command = `g++ "${filePath}" -o "${outPath}" &&  cd "${outputPath}" && ./${outputFilename}`;
    exec(`${command}`, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
