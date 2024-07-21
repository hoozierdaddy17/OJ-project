const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const executeCpp = (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFilename = `${jobId}.out`;
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
    const command = `g++ "${filePath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        await deleteFile(outPath);
        reject(error);
      } else if (stderr) {
        await deleteFile(outPath);
        reject(stderr);
      } else {
        await deleteFile(outPath);
        const outputArray = stdout.trim().split("\n");
        resolve(outputArray);
      }
    });
  });
};

// Function to delete a file
async function deleteFile(filePath) {
  try {
    await fs.promises.unlink(filePath); // Deletes the file
    console.log(`Deleted ${filePath} after execution.`);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
}

module.exports = {
  executeCpp,
};
