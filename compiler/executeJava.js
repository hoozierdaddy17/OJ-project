// const fs = require("fs");
// const path = require("path");
// const { exec } = require("child_process");

// const executeJava = (filePath, inputPath) => {
//   const jobId = path.basename(filePath).split(".")[0];
//   const jobOutputDir = path.join(__dirname, "temp", "submission", jobId); // Correct path
//   const outputFilename = "output.txt";
//   const outPath = path.join(jobOutputDir, outputFilename);
//   const classPath = path.join(jobOutputDir, `${jobId}.class`);
//   const javaPath = path.join(jobOutputDir, `${jobId}.java`);

//   // Create job-specific directory if it doesn't exist
//   if (!fs.existsSync(jobOutputDir))
//     fs.mkdirSync(jobOutputDir, { recursive: true });

//   // Copy the Java file to the job-specific directory
//   fs.copyFileSync(filePath, javaPath);

//   return new Promise((resolve, reject) => {
//     const compileCommand = `javac ${javaPath}`;
//     const runCommand = `java -cp ${jobOutputDir} ${jobId} < ${inputPath} > ${outPath}`;
//     const fullCommand = `${compileCommand} && ${runCommand}`;

//     exec(fullCommand, (error, stdout, stderr) => {
//       if (error) {
//         reject(new Error(`Execution error: ${error.message}`));
//       } else if (stderr) {
//         reject(new Error(`Execution error: ${stderr}`));
//       } else {
//         fs.readFile(outPath, "utf8", (err, data) => {
//           if (err) {
//             reject(new Error(`Failed to read output file: ${err.message}`));
//           } else {
//             resolve(data);
//           }
//         });
//       }
//     });
//   });
// };

// module.exports = {
//   executeJava,
// };
