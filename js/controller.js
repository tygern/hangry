hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choices = [];
    $scope.tags = [];
    $scope.count = 0;

    Hangry.loadData($scope, $http, 'data/restaurants.json');

    $scope.toggle = function toggle(item) {
        if (item.selected) {
            $scope.count -= 1;
        } else {
            $scope.count += 1;
        }

        item.selected = !item.selected;
    };

    $scope.clearTags = function clearTags() {
        $.each($scope.tags, function (i, tag) {
            tag.selected = false;
        });
        $scope.count = 0;
    };

    $scope.clearSearch = function clearSearch() {
        $scope.query = null;
    };

    $scope.$watch('count', function () {
        Hangry.updateScores($scope.tags, $scope.choices, $scope.count);
        Hangry.setStyles($scope.choices, $scope.count);
    });
});