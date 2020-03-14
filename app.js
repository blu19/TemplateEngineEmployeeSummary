//intern to generate intern file
const Intern = require("./lib/Intern")
//intern to generate manager file
const Manager = require("./lib/Manager")
//intern to generate engineer file
const Engineer= require("./lib/Engineer")
//inquirer for prompts
const inquirer = require("inquirer")

const path = require("path")
//fs for generating html files
const fs = require("fs")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")
​
const render = require("./lib/htmlRenderer");

var employeeList = []

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
    fs.writeFile(outputPath, render(employeeList), function(err){
        if (err) {
            throw err
        }
    })

.then(resManager => {
    var newManager = new Manager(response.name, response.id, response.email, resManager.officeNumber)
    employeeList.push(newManager)
    promptUser()
})

.then(resIntern => {
    var newIntern = new Intern(response.name, response.id, response.email, resIntern.school)
    employeeList.push(newIntern)
    promptUser()
})

.then(resEngineer => {
    var newEngineer = new Engineer(response.name, response.id, response.email, resEngineer.github)
    employeeList.push(newEngineer)
    promptUser()
})

}}
)}   

promptUser()