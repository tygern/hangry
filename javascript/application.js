var hangryApp = angular.module('hangryApp', []);

hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.restaurants = [];
    $scope.tags = [];

    $http.get('data/restaurants.json')
        .then(function (response) {
            $scope.restaurants = response.data;
            $.each($scope.restaurants, function (i, restaurant) {
                $.unique($.merge($scope.tags, restaurant.tags));
            });
        });

    


});
