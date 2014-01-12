hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choices = [];
    $scope.tagCollection = new Hangry.TagCollection([]);
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

    $scope.addTag = function addTag() {
        var match = Hangry.uniqueMatch($scope.query, $scope.tagCollection.tags);
        if (match) {
            $scope.toggle(match);
        }
        $scope.clearSearch();
    };

    $scope.$watch('query', function () {
        var matchedTag = Hangry.uniqueMatch($scope.query, $scope.tagCollection.tags);
        if (matchedTag) {
            matchedTag.match = true;
        } else {
            $.each($scope.tagCollection.tags, function (i, tag) {
                tag.match = false;
            });
        }
    });

    $scope.clearTags = function clearTags() {
        $.each($scope.tagCollection.tags, function (i, tag) {
            tag.selected = false;
        });
        $scope.count = 0;
    };

    $scope.clearSearch = function clearSearch() {
        $scope.query = null;
    };

    $scope.$watch('count', function () {
        Hangry.updateScores($scope.tagCollection, $scope.choices);
        Hangry.setStyles($scope.choices, $scope.count);
    });
});