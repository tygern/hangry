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

    $scope.clearTags = function clearTags() {
        $.each($scope.tagCollection.tags, function (i, tag) {
            tag.selected = false;
        });
        $scope.tagCollection.count = 0;
    };

    $scope.clearSearch = function clearSearch() {
        $scope.query = null;
    };

    $scope.$watch('tagCollection.count', function () {
        Hangry.updateScores($scope.tagCollection.tags, $scope.choices);
        Hangry.setStyles($scope.choices, $scope.tagCollection.count);
    });
});