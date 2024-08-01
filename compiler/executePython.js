// const fs = require("fs");
// const path = require("path");
// const { exec } = require("child_process");

// // Directory path for outputs
// const outputDir = path.join(__dirname, "outputs");

// // Create the output directory if it doesn't exist
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

// const executePython = (code, input) => {
//   const jobId = Date.now().toString();
//   const codePath = path.join(outputDir, `${jobId}.py`);
//   const inputPath = path.join(outputDir, `${jobId}.txt`);
//   const outputFilePath = path.join(outputDir, `${jobId}_output.txt`);

//   // Write the code and input to respective files
//   fs.writeFileSync(codePath, code);
//   fs.writeFileSync(inputPath, input);

//   return new Promise((resolve, reject) => {
//     // Command to run the Python script and redirect output to file
//     const runCommand = `python3 ${codePath} < ${inputPath} > ${outputFilePath}`;

//     exec(runCommand, (error, stdout, stderr) => {
//       if (error) {
//         return reject({ error, stderr });
//       }
//       if (stderr) {
//         return reject(stderr);
//       }
//       // Read the output from the file
//       fs.readFile(outputFilePath, "utf8", (err, data) => {
//         if (err) {
//           return reject(
//             new Error(`Failed to read output file: ${err.message}`)
//           );
//         }
//         resolve(data);
//       });
//     });
//   });
// };

// module.exports = {
//   executePython,
// };
