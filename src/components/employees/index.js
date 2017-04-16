import angular from 'angular';
import uirouter from 'angular-ui-router';

import employeesComponent from './employees.component';
import employeesSeedComponent from './employees-seed.component';
import employeesService from './employees.service';
import employeesRoutes from './employees.routes';
import './employees.scss';


const module = angular
  .module('employees', [
    uirouter
  ])
	.component('employees', employeesComponent)
  .component('employeesSeed', employeesSeedComponent)
	.service('EmployeesService', employeesService)
	.config(employeesRoutes)
	.name;

export default module;
