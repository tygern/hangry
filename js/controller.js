hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choiceCollection = new Hangry.ChoiceCollection([]);
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
        $scope.choiceCollection.updateScores($scope.tagCollection.tags);
        $scope.choiceCollection.setStyles($scope.tagCollection.count);
    });
});