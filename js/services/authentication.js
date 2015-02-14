myApp.factory('AuthService', function AuthService($http){

    var myObject = {
        login: function(user){
            return $http.post('api/users/' + user.username + '/' + user.password)
                .then( function success(response){
                    return response;
                });
        }
    }

    return myObject;

    });