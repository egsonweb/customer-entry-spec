import faker from 'faker';

class EmployeesService {
  static get $inject() {
    return [
      '$http',
      'DatabaseService'
    ];
  }

	constructor($http, DatabaseService) {
    this.$http = $http;
    this.db = DatabaseService;
    this.employees = this.db.model('employees')
	}

	find() {
    const query = this.employees.value(); 
    return this.db.resolve(query);
	}

  findById(id) {
    const query = this.employees.findIndex({
      employeeId: id
    }).value();

    return this.db.resolve(query);
  }

  create(employee) {
    const newEmployee = Object.assign(employee, {
      employeeId: faker.random.uuid(),
      avatar: faker.internet.avatar(),
      job: {
          title: faker.name.jobTitle(),
          type: faker.name.jobType()
      }
    });
    const query = this.employees.unshift(newEmployee).write();

    return this.db.resolve(query[0], 2000);
 }

  update(employee) {
    const query = this.employees.find({
      employeeId: employee.employeeId
    }).assign(employee).write();

    return this.db.resolve(query, 2000);
  }

  delete(employeeId) {
    const query = this.employees.remove({
      employeeId: employeeId
    }).write();

    return this.db.resolve(query);
  }
}

export default EmployeesService;
