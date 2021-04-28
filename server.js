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
var teamNameEl = "";
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
      teamNameEl = teamName;
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
  // create a variable to hold each each STRING from functions
  let team_cards = [];
  let card_string = "";
  // build a function that returns a string `<div> ${OBJECT.name} </div> `
  const cardWriter = team_cards => {
    card_string = JSON.stringify(team_cards);
    team_cards.join(" ");
  };
  // some functionality for deterimining what ROLE a given EMPLOYEE OBJECT we have
  console.log(team);
  let newCard;
  for (var i = 0; i < team.length; i++) {
    switch (team[i].role) {
      case "Manager":
        newCard = managerCard(team[i]);
        team_cards.push(newCard);
        break;
      case "Intern":
        newCard = internCard(team[i]);
        team_cards.push(newCard);
        break;
      case "Engineer":
        newCard = engineerCard(team[i]);
        team_cards.push(newCard);
        break;
      default:
        console.log("role call failed");
    }
    cardWriter(team_cards);

    // Call our next loop function
  }

  console.log(team_cards);

  // Create A Card
  function managerCard(manager) {
    return `
<div class="card" style="width:20%">
  <div class="card-header">
    <h3>Name: ${manager.name}</h3>
    <h3><i class="fas fa-mug-hot"></i>${manager.role}</h3>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id:${manager.id}</li>
      <li class="list-group-item">Email:<a href="mailto: ${manager.email}">${manager.email}</a></li>
      <li class="list-group-item">Office Number:${manager.office} </li>
    </ul>
  </div>
</div>
      `;
  }
  function engineerCard(engineer) {
    return `
<div class="card" style="width:20%">
  <div class="card-header">
    <h3>Name: ${engineer.name}</h3>
    <h3><i class="fas fa-glasses"></i>${engineer.role}</h3>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id:${engineer.id}</li>
      <li class="list-group-item">Email:<a href="mailto: ${engineer.email}">${engineer.email}</a></li>
      <li class="list-group-item">Github:<a href="https://github.com/${engineer.gitHub}" target="_blank">${engineer.gitHub}</a></li>
    </ul>
  </div>
</div>
      `;
  }
  function internCard(intern) {
    return `
<div class="card" style="width:20%">
  <div class="card-header">
    <h3>Name: ${intern.name}</h3>
    <h3><i class="fas fa-school"></i>${intern.role}</h3>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id:${intern.id}</li>
      <li class="list-group-item">Email:<a href="mailto: ${intern.email}">${intern.email}</a></li>
      <li class="list-group-item">School:${intern.school}</li>
    </ul>
  </div>
</div>
      `;
  }

  // Create our Base HTML file
  const pageBuilder = card_string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

        <title>Document</title>
    </head>
    <body>
    <header style="background-color:red" width="100%" height="20vh">
    <div class="container-fluid">
    <div class="row">
        <div class="col-12 jumbotron mb-3 team-heading">
            <h1 class="text-center">${teamNameEl}</h1>
        </div>
    </div>
</div>
</header>
    <div class="container" style="padding: 20px;">
        <div class="row team-area col-12 d-flex justify-content-center">
          ${team_cards} 
        </div>
     </div>

    </body>
    </html>
    `;
  };

  try {
    const html = pageBuilder(team_cards);
    fs.writeFileSync("teamProfile.html", html);
    console.log("Successfully wrote to teamProfile.html");
  } catch (error) {
    console.log(error);
  }
}

initPrompt();
