import * as fs from "fs";
const CURR_DIR = process.cwd();

const createDirectoryProject = (templatePath, newProjectPath) => {
  const fileToCreate = fs.readdirSync(templatePath);

  fileToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf-8");

      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf-8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);


      createDirectoryProject(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      )
    }
  });
};


export default createDirectoryProject;