class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  }

  // define our Object methods
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return this.role;
    // return "Employee";
  }
}

module.exports = Employee;

/*
let bob = new Employee("bob", 5, "bob@company.net");
let x = bob.getRole();
console.log(x);
*/
