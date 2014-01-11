var hangryApp = angular.module('hangryApp', []);

hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choices = [];
    $scope.tags = [];

    Hangry.loadData($scope, $http, 'data/restaurants.json');

});

Hangry = {
    loadData: function loadData(target, fetcher, file) {
        fetcher.get(file)
            .then(function (response) {
                target.choices = response.data;
                $.each(target.choices, function (i, choice) {
                    $.unique($.merge(target.tags, choice.tags));
                });
            })
    }
};
