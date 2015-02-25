myApp.controller('LoginCtrl', function($scope, $rootScope, $location, $cookieStore, AuthService){

    if($cookieStore.get('username')){
        $location.path('/users');
    }

    $scope.login = function(){
        AuthService.login($scope.user).
            then(function(response) {

                if (response.data != 'false') {
                    $cookieStore.put('username', response.data.username);
                    $cookieStore.put('userID', response.data.user_id);
                    $location.path('/users');
                }else{
                    $scope.errMessage = 'Logon failed';
                    $location.path('/login');
                }

            });
    }
    //$scope.username = $cookieStore.get('username');

    $scope.logout = function(){
        $cookieStore.remove('username');
        $cookieStore.remove('user_id');
        $rootScope.username ='';
        $location.path('/login');
    }
});