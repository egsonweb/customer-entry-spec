import angular from 'angular';

import Employees from './employees'

const module = angular
  .module('components', [
    Employees
  ])
  .name

export default module;
