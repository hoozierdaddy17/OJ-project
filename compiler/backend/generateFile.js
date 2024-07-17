const fs = require("fs");
const path = require("path");

const { v4: uuid } = require("uuid");

// Backend => Root Folder

// __dirname stores the current directory path:
// This creates a file named "codes" in the __dirname path, which would be:
// C:\Users\iamsa\Desktop\CODES\Web Development\Online Compiler

const dirCodes = path.join(__dirname, "codes");
// C:\Users\iamsa\Desktop\CODES\Web Development\Online Compiler\codes

//  {recursive: true} => tells Node.js to create the directory and any necessary parent directories recursively if they don't exist. If any directories in the path specified by dirCodes are missing, they will be created automatically.
if (!fs.existsSync(dirCodes)) fs.mkdirSync(dirCodes, { recursive: true });

const generateFile = (language, code) => {
  // create unique file names
  const jobId = uuid(); //"8089f3ad-6c2e-4b65-8084-c6220f1d1384"
  const fileName = `${jobId}.${language}`; // "8089f3ad-6c2e-4b65-8084-c6220f1d1384.python"

  let filePath;

  if (language === "cpp") {
    const dirCPP = path.join(dirCodes, "cpp");
    if (!fs.existsSync(dirCPP)) fs.mkdirSync(dirCPP, { recursive: true });
    filePath = path.join(dirCPP, fileName);
  } else if (language === "java") {
    const dirJava = path.join(dirCodes, "java");
    if (!fs.existsSync(dirJava)) fs.mkdirSync(dirJava, { recursive: true });
    filePath = path.join(dirJava, fileName);
  } else {
    const dirPython = path.join(dirCodes, "python");
    if (!fs.existsSync(dirPython)) fs.mkdirSync(dirPython, { recursive: true });
    filePath = path.join(dirPython, fileName);
  }

  // C:\Users\iamsa\Desktop\CODES\Web Development\Online Compiler\codes\8089f3ad-6c2e-4b65-8084-c6220f1d1384.python
  fs.writeFileSync(filePath, code); //we are writing our code in the filePath
  return filePath;
};

module.exports = {
  generateFile,
};
