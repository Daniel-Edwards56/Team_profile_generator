const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, office) {
    super(name, id, email);
    this.role = "Manager";
    this.office = office;
  }

  getName() {
    return this.name;
  }
  
  getRole() {
    return this.role;
    //return "Manager";
  }
  getOffice() {
    return this.office;
  }
}
module.exports = Manager;
