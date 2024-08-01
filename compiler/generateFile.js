const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const generateFile = async (language, code) => {
  const dirCodes = path.join(__dirname, "codes");

  if (!fs.existsSync(dirCodes)) fs.mkdirSync(dirCodes, { recursive: true });

  let fileName;

  // Determine file name and extension based on language
  if (language === "cpp") {
    fileName = `${uuid()}.cpp`;
  } else if (language === "java") {
    fileName = "Main.java"; // Fixed name for Java files
  } else if (language === "python") {
    fileName = `${uuid()}.py`;
  } else {
    throw new Error("Unsupported language");
  }

  // Determine directory and file path based on language
  let filePath;
  if (language === "cpp") {
    const dirCPP = path.join(dirCodes, "cpp");
    if (!fs.existsSync(dirCPP)) fs.mkdirSync(dirCPP, { recursive: true });
    filePath = path.join(dirCPP, fileName);
  } else if (language === "java") {
    const dirJava = path.join(dirCodes, "java");
    if (!fs.existsSync(dirJava)) fs.mkdirSync(dirJava, { recursive: true });
    filePath = path.join(dirJava, fileName);
  } else if (language === "python") {
    const dirPython = path.join(dirCodes, "python");
    if (!fs.existsSync(dirPython)) fs.mkdirSync(dirPython, { recursive: true });
    filePath = path.join(dirPython, fileName);
  }

  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFile,
};
