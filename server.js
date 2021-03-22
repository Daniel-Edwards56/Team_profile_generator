const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const output_folder = path.resolve(__dirname, "dist");
const output_path = path.join(output_folder, "team.html");

const { uuid } = require("uuidv4");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
var team = [];

const initPrompt = () =>
  inquirer
    .prompt([
      {
        type: "input",
        name: "teamName",
        message: "What is the name of your team?"
      }
    ])
    .then(data => {
      const teamName = data.teamName;
      team.push(teamName);
      createManager();
    });

function createManager() {
  // New Inquirer Prompt
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
      },
      {
        type: "input",
        name: "email",
        message: "What is their email address?"
      },
      {
        type: "input",
        name: "office",
        message: "What is the manager's office number?"
      }
    ])
    .then(employeeData => {
      // Deconstruct our Response Object
      const { name, email, office } = employeeData;
      // create a new Manager tempOct
      let managerObj = new Manager(name, uuid(), email, office);
      console.log(managerObj);
      console.log(typeof managerObj);
      // add new Obj to Team
      team.push(managerObj);
      // New prompt set call
      promptUser();
    })
    .catch(err => console.log(err));
}

const promptUser = () =>
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "option",
        choices: ["Add Team Member", "Generate Team"]
      }
    ])
    .then(data => {
      console.log(data);
      if (data.option === "Add Team Member") {
        createEmployee();
      } else {
        generateTeam();
      }
    })
    .catch(err => {
      console.log(err);
    });

function createEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
      },
      {
        type: "input",
        name: "email",
        message: "What is their email address?"
      },
      {
        type: "list",
        message: "What position will they be filling?",
        name: "position",
        choices: ["Engineer", "Intern"]
      }
    ])
    .then(employeeData => {
      var tempObj = {
        id: uuid(),
        name: employeeData.name,
        email: employeeData.email
      };
      console.log(employeeData.position);
      // Switch Statement
      switch (employeeData.position) {
        case "Engineer":
          createEngineer(tempObj);
          break;
        case "Intern":
          createIntern(tempObj);
          break;
        default:
          console.log("Weird Error");
      }
    })
    .catch(err => console.log(err));
}
function createEngineer(obj) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "gitHub",
        message: "What is the engineer's github username?"
      }
    ])
    .then(employeeData => {
      // Deconstruct our Response Object
      const { name, email, id } = obj;
      const { gitHub } = employeeData;
      // create a new Manager Object
      let engineerObj = new Engineer(name, id, email, gitHub);

      // add new Obj to Team
      team.push(engineerObj);
      // New prompt set call
      promptUser();
    })
    .catch(err => console.log(err));
}

function createIntern(obj) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "school",
        message: "What school does the intern attend?"
      }
    ])
    .then(employeeData => {
      // Deconstruct our Response Object
      const { name, email, id } = obj;
      const { school } = employeeData;
      // create a new Intern Object
      let internObj = new Intern(name, id, email, school);

      // add new Obj to Team
      team.push(internObj);
      // New prompt set call
      promptUser();
    })
    .catch(err => console.log(err));
}

function generateTeam() {
  // build a function that returns a string `<div> ${OBJECT.name} </div> `
  console.log(team);

  // some functionality for deterimining what ROLE a given EMPLOYEE OBJECT we have
  
  
  // create a variable to hold each each STRING from functions
  let team_cards = [];

  // Create A Card
  function managerCard(manager) {
      return `
        <div> 
          <h3>Name: ${manager.getName()}</h3>
          <p>${manager.getRole()}</p> 
        </div>
      `
  }

  // Create our Base HTML file
  function pageBuilder()  {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Document</title>
    </head>
    <body>
      ${team_cards} 
    </body>
    </html>
    `
  }



}

initPrompt();
