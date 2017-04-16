import angular from 'angular';
import NavBar from './navbar';

const module = angular
  .module('common', [])
	.component('navbar', NavBar)
  .name

export default module;
