var myApp = angular.module('myApp',[
    'ngRoute',
    'ngCookies',
    'angularUtils.directives.dirPagination'
]);


myApp.config(['$routeProvider', function($routeProvider){
   $routeProvider
       .when('/login',{
       templateUrl: 'partials/login.html',
           controller: 'LoginCtrl'
        })
       .when('/clients',{
           templateUrl: 'partials/clients.html',
           controller: 'ClientsCtrl'
       })
       .when('/users',{
           templateUrl: 'partials/users.html',
           controller: 'UsersCtrl'
       })
       .when('/personnel',{
           templateUrl: 'partials/personnel.html',
           controller: 'PersonnelCtrl'
       })
       .when('/consort',{
           templateUrl: 'partials/consort.html',
           controller: 'ConsortCtrl'
       })
       .when('/tests',{
           templateUrl: 'partials/tests.html',
           controller: 'TestsCtrl'
       })
       .when('/error',{
           templateUrl: 'partials/error.html'
       })
       .otherwise({
           redirectTo: '/login'
       });
}])
    .run(function( $rootScope,$location, $cookieStore){
       $rootScope.$on('$locationChangeSuccess', function(){
           $rootScope.username = $cookieStore.get('username');
           $rootScope.userID = $cookieStore.get('userID');
       });

        $rootScope.$on('$locationChangeStart', function(){
            $rootScope.username = $cookieStore.get('username');

            if($rootScope.username == null && $location.path() != '/login'){
                if($location.path() != ''){
                    $rootScope.errMsg = 'You must login to view this page';
                    event.preventDefault();
                    $location.path('/error');
                }

            }
        });
    });

myApp.controller('UsersCtrl', function($scope, $http, $location){
    $scope.currentPage = 1;
    $scope.pageSize = 23;
    $http.get('api/users').success(function(data) {
        $scope.users = data;
    });
    $scope.getUsers = function(){
        $location.path('/users');
    }


});// end users ctrl

myApp.controller('ClientsCtrl', function($scope, $http, $location){
    $scope.currentPage = 1;
    $scope.pageSize = 23;
    $http.get('api/clients').success(function(data) {
        $scope.clients = data;
    });
    $scope.getClients = function(){
        $location.path('/clients');
    }


});// end clients ctrl

myApp.controller('TestsCtrl', function($scope, $http, $location){
    $scope.currentPage = 1;
    $scope.pageSize = 23;
    $http.get('api/tests').success(function(data) {
        $scope.tests = data;
    });
    $scope.getTests = function(){
        $location.path('/tests');
    }


});// end tests ctrl

myApp.controller('ConsortCtrl', function($scope, $http, $location){
    $scope.currentPage = 1;
    $scope.pageSize = 23;
    $http.get('api/consorts').success(function(data) {
        $scope.consorts = data;
    });
    $scope.getConsorts = function(){
        $location.path('/consorts');
    }


});// end consort ctrl

// begin personnel ctrl
myApp.controller('PersonnelCtrl', function($scope, $http, $location){

    $scope.currentPage = 1;
    $scope.pageSize = 23;



    $http.get('api/personnel').success(function(data) {
        $scope.personnel = data;
    });
    $scope.getPersonnel = function(){
        $location.path('/personnel');
    }


});// end personnel ctrl


//Nav ctrl

myApp.controller('NavCtrl', function($scope, $location){
    $scope.date = new Date();
    $scope.header = "company header";
    $scope.footer = "company copyright";

    $scope.isActive = function(viewLocation){
        var active = (viewLocation === $location.path());
        return active;
    }

});//end nav ctrl


myApp.controller('PagingController', function($scope){

    $scope.pageChangeHandler = function(num) {

    };
});
myApp.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('partials/dirPagination.tpl.html');
});



