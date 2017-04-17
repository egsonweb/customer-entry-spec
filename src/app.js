import angular from 'angular';
import Uirouter from 'angular-ui-router';
import ngMessages from 'angular-messages';

import DatabaseService from './shared/db';
import FakerService from './shared/faker';

import Common from './common';
import Components from './components';
import appTemplate from './app.html';
import './app.scss';

const app = {
  template: appTemplate,
  controller: class AppController {}
}

function bootstrap() {
  angular.bootstrap(document, ['synopsis'])
}

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise('/employees');
}
config.$inject = ['$urlRouterProvider'];

angular
  .module('synopsis', [
    ngMessages,
    Uirouter,
    Common,
    Components
  ])
  .config(config)
  .service('FakerService', FakerService)
  .service('DatabaseService', DatabaseService)
  .component('app', app);

angular
  .element(document)
  .ready(bootstrap);
