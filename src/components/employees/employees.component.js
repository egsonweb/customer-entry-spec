import angular from 'angular';
import employeesTemplate from './employees.html';

class EmployeesController {
  static get $inject() {
    return [
      '$scope',
      'EmployeesService'
    ]
  }

	constructor($scope, EmployeesService) {
    this.$scope = $scope;
    this.employeesService = EmployeesService;
    this.employees = [];
    this.employee = {};

    this.checkAll = false;
    this.showModal = false;
    this.editing = false;
    this.submit = false;

    const unsubscribe = this.$scope.$on('seed', (scope, { employees, status}) => {
      this.employees = employees;
      if (status) {
        unsubscribe();
      }
    });
	}

	$onInit() {
    this.employeesService.find().then(employees => {
      this.employees = employees;
      this.employees = this.employees.map(employee => {
        return Object.assign(employee, {selected: false});
      })
      this.reset();
    });
  }

  add() {
    this.employeesService.create(this.newEmployee).then(() => {
      this.$scope.$evalAsync(() => {
        this.reset();
      });
    });
  }

  reset() {
    this.newEmployee = angular.copy(this.employee);
    this.showModal = false;
    this.editing = false;
  }

  show() {
    this.showModal = true;
  }

  cancel() {
    this.$scope.$evalAsync(() => {
      this.reset();
    });
  }

  delete(id) {
    this.employeesService.delete(id).then(employee => {
      let employeeIdx = this.findById(id);
      console.log(employee);
      // console.log(employeeIdx);
      this.$scope.$evalAsync(() => {
        this.employees.splice(employeeIdx, 1);
      });
    });
  }

  deleteSelected() {
    console.log(this.selectedEmployees);
  }

  selected() {
    return this.employees.filter(employee => {
      return employee.selected === true;
    }).length;
  }

  edit(employee) {
    this.editing = true;
    this.showModal = true;
    this.newEmployee = angular.copy(employee);
  }

  findById(employeeId) {
    let employees = this.employees;
    let length = employees.length;
    while(length--) {
      if (employees[length].employeeId === employeeId) {
        return length;
      }
    }
  }

  findSelected() {
    return this.employees.filter(employee => employee.selected).length;
  }

  update() {
    this.employeesService.update(this.newEmployee).then(() => {
      this.$scope.$evalAsync(() => {
        this.reset();
      });
    });
  }

  select(id) {
    let employeeIdx = this.findById(id);
    let length = this.employees.length;

    this.checkAll = (length === this.findSelected()) ? true : false;
    if (this.employees[employeeIdx].selected) {
      this.employees[employeeIdx].selected = true;
    } else {
      this.employees[employeeIdx].selected = false;
    }
  }

  selectAll() {
    if (this.checkAll) {
      this.employees.filter(employee => !employee.selected).forEach(employee => {
        employee.selected = !employee.selected;
      });
    } else {
      this.employees.forEach(employee => {
        employee.selected = !employee.selected;
      });
    }
  }
}


const employeesComponent = {
	template: employeesTemplate,
	controller: EmployeesController
};

export default employeesComponent;
