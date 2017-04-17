import angular from 'angular';
import employeesTemplate from './employees.html';

class EmployeesController {
  static get $inject() {
    return ['$scope', 'EmployeesService'];
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

    const unsubscribe = this.$scope.$on('seeded', (scope, {
      employees,
      status
    }) => {
      this.employees = employees;
      if (status) {
        unsubscribe();
      }
    });
  }

  $onInit() {
    this.employeesService.find().then(employees => {
      this.employees = employees;
      this.reset();
    });
  }

  reset() {
    this.newEmployee = angular.copy(this.employee);
    this.showModal = false;
    this.editing = false;
    this.submit = false;
    this.submitting = false;
  }

  show() {
    this.showModal = true;
  }

  cancel() {
    this.$scope.$applyAsync(() => {
      this.reset();
    });
  }

  isValid() {
    return this.employeeForm.$dirty && this.employeeForm.$valid;
  }

  edit(employee) {
    this.editing = true;
    this.showModal = true;
    this.newEmployee = angular.copy(employee);
  }

  add() {
    this.submit = true;
    if (this.isValid()) {
      this.submitting = true;
      this.employeesService.create(this.newEmployee).then(() => {
        this.$scope.$applyAsync(() => {
          this.submitting = false;
          this.reset();
        });
      });
    }

    return false;
  }

  update() {
    this.submit = true;
    if (this.isValid()) {
      this.submitting = true;
      this.employeesService.update(this.newEmployee).then(() => {
        this.$scope.$applyAsync(() => {
          this.submitting = true;
          this.reset();
        });
      });
    }

    return false;
  }

  delete(id) {
    this.employeesService.delete(id).then(() => {
      this.$scope.$applyAsync();
    });
  }

  deleteSelected() {
    let selectedEmployees = this.employees.filter(
      employee => employee.selected
    );
    selectedEmployees.forEach(employee => {
      this.delete(employee.employeeId);
    });
  }

  selected() {
    return this.employees.filter(employee => employee.selected).length;
  }

  select(employeeId) {
    this.employeesService.findById(employeeId).then(employeeIdx => {
      let allEmployees = this.employees.length;
      let selectedEmployees = this.selected();

      this.$scope.$applyAsync(() => {
        this.checkAll = allEmployees === selectedEmployees ? true : false;
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
      this.employees
        .filter(employee => !employee.selected)
        .forEach(employee => {
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
