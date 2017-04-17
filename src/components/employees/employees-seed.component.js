import employeesSeedTemplate from './employees-seed.html';

class EmployeesSeedController {
  static get $inject() {
    return [
      '$window',
      'DatabaseService'
    ];
  }

  constructor($window, DatabaseService) {
    this.$window = $window;
    this.db = DatabaseService;
    this.seeded = this.$window.localStorage.getItem('db.status') || false;
  }

  seed() {
    this.db.seed().then(() => {});
  }
}

const employeesSeedComponent = {
  template: employeesSeedTemplate,
  controller: EmployeesSeedController
}

export default employeesSeedComponent;
