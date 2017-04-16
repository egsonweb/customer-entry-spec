import Low from 'lowdb';
import faker from 'faker';

class DatabaseService {
  static get $inject() {
    return [
      '$window',
      '$rootScope',
      'FakerService'
    ];
  }

  constructor($window, $rootScope, FakerService) {
    this.models = Low('db.json');
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.faker = FakerService;
    this.status = null;

    this.models.defaults({ employees: [] }).write();
  }

  seed() {
    this.status = this.$window.localStorage.getItem('STATUS') || false;
    if (!this.status) {
      console.log('Seeding database');
      this.faker.generate().then(employees => {
        this.models.set('employees', employees).write();
        this.$window.localStorage.setItem('STATUS', true);
        this.$rootScope.$broadcast('seed', {
          employees: this.models.get('employees').value(),
          status: this.$window.localStorage.getItem('STATUS')
        });
      });
    }

    return;
  }

  find() {
    return this.models.get('employees').value();
  }

  insert(employee) {
    const newEmployee = Object.assign(employee, {
      employeeId: faker.random.uuid(),
      avatar: faker.internet.avatar(),
      job: {
          title: faker.name.jobTitle(),
          type: faker.name.jobType()
      }
    });
    return this.models.get('employees').unshift(newEmployee).write();
  }

  update(employee) {
    return this.models.get('employees').find({
      employeeId: employee.employeeId
    }).assign(employee).write();
  }

  remove(employeeId) {
    return this.models.get('employees').remove({
      employeeId: employeeId
    }).write();
  }
}

export default DatabaseService;
