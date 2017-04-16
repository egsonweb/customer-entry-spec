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

    const unsubSeeded = this.$scope.$on('seeded', (scope, { employees, status}) => {
      this.employees = employees;
      if (status) {
        unsubSeeded();
      }
    });
	}

	$onInit() {
    this.employeesService.find().then(employees => {
      this.employees = employees;
      this.reset();
    });
  }

  add() {
    this.employeesService.create(this.newEmployee).then(newEmployee => {
      this.$scope.$evalAsync(() => {
        console.log(newEmployee);
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
      console.log(employee);
      this.$scope.$evalAsync();
    });
  }

  deleteSelected() {
    let selectedEmployees = this.employees.filter(employee => employee.selected);
    selectedEmployees.forEach(employee => {
      this.delete(employee.employeeId);
    });
  }

  edit(employee) {
    this.editing = true;
    this.showModal = true;
    this.newEmployee = angular.copy(employee);
  }

  update() {
    this.employeesService.update(this.newEmployee).then(employee => {
      console.log(employee);
      this.$scope.$evalAsync(() => {
        this.reset();
      });
    });
  }

  selected() {
    return this.employees.filter(employee => employee.selected).length;
  }

  select(employeeId) {
    this.employeesService.findById(employeeId).then(employeeIdx => {
      console.log(employeeIdx);
      let allEmployees = this.employees.length;
      let selectedEmployees = this.selected();

      this.$scope.$evalAsync(() => {
        this.checkAll = (allEmployees === selectedEmployees) ? true : false;
        if (this.employees[employeeIdx].selected) {
          this.employees[employeeIdx].selected = true;
        } else {
          this.employees[employeeIdx].selected = false;
        }
      });
    });
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
