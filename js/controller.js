hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choices = [];
    $scope.tagCollection = new Hangry.TagCollection([]);

    Hangry.loadData($scope, $http, 'data/restaurants.json');

    $scope.addTag = function addTag() {
        $scope.tagCollection.toggleMatches();
        $scope.clearSearch();
    };

    $scope.$watch('query', function () {
        $scope.tagCollection.findUniqueMatch($scope.query);
    });

    $scope.clearSearch = function clearSearch() {
        $scope.query = null;
    };

    $scope.$watch('tagCollection.count', function () {
        Hangry.updateScores($scope.tagCollection.tags, $scope.choices);
        Hangry.setStyles($scope.choices, $scope.tagCollection.count);
    });
});