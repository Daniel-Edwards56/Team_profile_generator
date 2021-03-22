const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.role = "Engineer";
    this.gitHub = gitHub;
  }
  getRole() {
    return this.role;
  }
  getGitHub() {
    return this.gitHub;
  }
}
module.exports = Engineer;
