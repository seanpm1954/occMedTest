var myApp = angular.module('myApp',[
    'ngRoute',
    'ngCookies',
    'angularUtils.directives.dirPagination',
    'ang-drag-drop'
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
       .when('/testLayout',{
           templateUrl: 'partials/testLayout.html',
           controller: 'TestLayoutCtrl'
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

});// end tests ctrl;

myApp.controller('TestLayoutCtrl', function($scope, $http, $location){

    //get consorts used by client - returning all now....

    $http.get('api/tests').success(function(data) {
        $scope.tests = data;
    });

    $http.get('api/consorts').success(function(data) {
        $scope.tConsorts = data;

        for(i = 0; i < $scope.tConsorts.length; i++){
            $scope.selectedTest = [ //dropZone for consort
                {test_id:$scope.tConsorts[0].consort_id},
                {test_name:$scope.tConsorts[0].consort_name}
            ];

            $scope.selectedTest1 = [ //dropZone for consort
                {test_id:$scope.tConsorts[1].consort_id},
                {test_name:$scope.tConsorts[1].consort_name}
            ];
        };
    });

    $scope.dropSuccessHandler = function($event,index,array){
        //index=1 = header
        if(index != 1){
            array.splice(index,1);
        }
    };

    $scope.onDrop = function($event,$data,array){
        array.push($data);
    };

    $scope.saveTest = function(array, array1){
        // each array represents a test section
        // i=2 to skip consortium and first id
        for(i = 2; i < array.length; i++){
            console.log(array[1].test_name + " " + array[0].test_id);//consort
            console.log(array[i].test_name + " " + array[i].test_id);
        }

        for(i = 2; i < array1.length; i++){
            console.log(array1[1].test_name + " " + array1[0].test_id);//consort
            console.log(array1[i].test_name + " " + array1[i].test_id);
        }
    }
});//  end test layout crl


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



