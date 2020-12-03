const fs = require("fs");
const path = require("path");
const prompt = require("prompt");
const { PROJECTS_DIR } = require("./config.json");
const { run, runSync } = require("node-cmd");
const { exec, spawn } = require("child_process");

const projectNames = fs.readdirSync(PROJECTS_DIR);
projectNames.forEach((projectName, index) => {
    console.log(`Press ${index + 1} to make apk for Project [${projectName}]`);
});

const schema = {
    properties: {
        projectNumber: {
            description: "Enter The Project Number",
            message: "Invalid Project Number",
            required: true,
            conform: function (value) {
                if (value < 1) {
                    return false;
                }
                if (value > projectNames.length) {
                    return false;
                }
                return true;
            },
        },
    },
};
prompt.get(schema, function (error, result) {
    if (error) {
        console.log("There was a error in getting project number: ", error);
        return;
    }
    const index = result.projectNumber - 1;
    const projectName = projectNames[index];
    const projectDir = path.join(PROJECTS_DIR, projectName);
    const cp = spawn(path.join(__dirname, "make_release_apk.bat"), {
        cwd: projectDir,
        env: process.env,
        shell: "cmd",
    });
    cp.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    cp.stderr.on("data", (data) => {
        console.log("Error in making APK");
        console.log(data.toString("utf8"));
    });
});
