const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```




//inquirer for prompts
const inquirer = require("inquirer")
//fs for generating html files
const fs = require("fs")
//util for writing html files
const util = require("util")

//intern to generate intern file
const Intern = require("./intern")
//intern to generate manager file
const Manager = require("./manager")
//intern to generate engineer file
const Engineer= require("./engineer")

var employeeList = [];

//prompting the user for name, email, ID, role
function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: ["Intern", "Engineer", "Manager", "Done. No More Employees."]
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
        }
    ])


.then(response => {
//continue prompts based on response 
if (response.role === "Intern") {
    return inquirer.prompt([
    {
        type: "input",
        message: "What school did you attend?",
        name: "school"
    }
    ])        
} else if (response.role === "Engineer") {
    return inquirer.prompt([
    {
        type: "input",
        message: "What is your Github username?",
        name: "github"
    }
    ])    
} else if (response.role === "Manager") {
    return inquirer.prompt([
    {
        type: "input",
        message: "Which is the manager's office?",
        name: "office"
    } 
    ])
} else {
    //call render function (the employee list)
}

}
)
.then(resManager => {
    //employee qs
    //if statement for role
    //
    var newManager = new Manager(response.name, response.id, response.email, resManager.officeNumber)
    employeeList.push(newManager)
})
}    

//function to prompt follow up questions if intern, engineer or manager (school, github, or office)

//function to determine if all users have been added or not
//if not, then cycle through the prompts again to create a new employee
//if yes, then proceed to writing the html file

//to generate file when no more employees to add
const writeFileSync = util.promisify(fs.writeFile)

//function to generate the intern html file
//do I need one for each employee type?
function generateInternHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Name: ${answers.name}</h1>
    <p class="lead">ID: ${answers.id}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">Email: ${answers.email}</li>
      <li class="list-group-item">School: ${answers.school}</li>
    </ul>
  </div>
</div>
</body>
</html>`
}

//calling promptUser function and .then function to generate HTML file 
//do I need one for each employee type?
promptUser()
  .then(function(answers) {
    const html = generateInternHTML(answers)

    return writeFileSync("intern.html", html)
  })
  .then(function() {
    console.log("Successfully wrote to intern.html")
  })
  .catch(function(err) {
    console.log(err)
  })
