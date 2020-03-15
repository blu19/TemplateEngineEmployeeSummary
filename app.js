//intern to generate intern file
const Intern = require("./lib/Intern");
//intern to generate manager file
const Manager = require("./lib/Manager");
//intern to generate engineer file
const Engineer = require("./lib/Engineer");
//inquirer for prompts
const inquirer = require("inquirer");

const path = require("path");
//fs for generating html files
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeList = [];

//prompting the user for name, email, ID, role

function end(list) {
  console.log(list)
  // console.log("Inside end");

  return fs.writeFile(outputPath, render(list), function(err) {
    // console.log("Wrote Html");
    if (err) {
      throw err;
    }
  });
}
function promptUser() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Intern", "Engineer", "Manager"]
      },
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
      },
      {
        type: "input",
        message: "What is the employee's ID?",
        name: "id"
      },
      {
        type: "confirm",
        message: "Need to add anymore employees?",
        name: "done"
      }
    ])

    .then(response => {
      const doContinue = response.done === false;
      //continue prompts based on response
      if (response.role === "Intern") {
        // console.log("Made Intern");
        const newIntern = new Intern(
          response.name,
          // response.role,
          response.id,
          response.email,
          response.school
        );
        return inquirer
          .prompt([
            {
              type: "input",
              message: "What school did you attend?",
              name: "school"
            }
          ])
          .then(resIntern => {
            newIntern["school"] = resIntern.school;
            employeeList.push(newIntern);
            if (doContinue) {
              return end(employeeList)
            } else{
              promptUser()
            }
          });
      } else if (response.role === "Engineer") {
        // console.log("Made an Engineer");
        const newEngineer = new Engineer(
          response.name,
          // response.role,
          response.id,
          response.email,
          response.github
        );
        return inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Github username?",
              name: "github"
            }
          ])
          .then(resEngineer => {
            newEngineer["github"] = resEngineer.github
            employeeList.push(newEngineer);
            if (doContinue) {
              return end(employeeList)
            } else {
              promptUser();
            }
          });
      } else if (response.role === "Manager") {
        // console.log("Made an Manager");
        const newManager = new Manager(
          response.name,
          // response.role,
          response.id,
          response.email,
          response.officeNumber
        )
        return inquirer
          .prompt([
            {
              type: "input",
              message: "Which is the manager's office?",
              name: "officeNumber"
            }
          ])
          .then(resManager => {
            newManager["officeNumber"] = resManager.officeNumber
            employeeList.push(newManager);
            if (doContinue) {
              return end(employeeList)
            } else {
              promptUser();
            }
          });
      }
    });
}
promptUser();