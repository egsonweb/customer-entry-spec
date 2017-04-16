import employeesSeedTemplate from './employees-seed.html';

class EmployeesSeedController {
  static get $inject() {
    return [
      'DatabaseService'
    ];
  }

  constructor(DatabaseService) {
    this.db = DatabaseService;
  }

  seed() {
    this.db.seed();
  }
}

const employeesSeedComponent = {
  template: employeesSeedTemplate,
  controller: EmployeesSeedController
}

export default employeesSeedComponent;
