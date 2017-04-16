function routes($stateProvider) {
  $stateProvider
    .state('employees', {
      url: '/employees',
      component: 'employees'
    });
}

routes.$inject = ['$stateProvider'];

export default routes;
