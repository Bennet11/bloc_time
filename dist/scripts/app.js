(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'mainCtrl as main',
        templateUrl: 'templates/main.html'
      });
  }

  angular
    .module('blocTime', ['firebase', 'ui.router'])
    .config(config);
})();
