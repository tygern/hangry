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

    $scope.addTag = function addTag() {
        var matches = [];
        $.each($scope.tags, function(i, tag) {
           if (tag.name.match(new RegExp($scope.query, "ig")) && !tag.selected) {
               matches.push(tag)
           }
        });
        if (matches.length == 1) {
           $scope.toggle(matches[0]);
        }
       $scope.clearSearch();
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
        Hangry.updateScores($scope.tags, $scope.choices);
        Hangry.setStyles($scope.choices, $scope.count);
    });
});