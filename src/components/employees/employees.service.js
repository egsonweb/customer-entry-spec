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
	}

	find() {
		return new Promise(resolve => {
      resolve(this.db.find());
    });
	}

  create(employee) {
    return new Promise(resolve => {
      resolve(this.db.insert(employee));
    });
  }

  update(employee) {
    return new Promise(resolve => {
      resolve(this.db.update(employee));
    });
  }

  delete(employeeId) {
    return new Promise(resolve => {
      resolve(this.db.remove(employeeId));
    });
  }
}

export default EmployeesService;
