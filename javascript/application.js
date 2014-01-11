var hangryApp = angular.module('hangryApp', []);

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

    $scope.$watch('count', function () {
        Hangry.updateScores($scope.tags, $scope.choices);
    });

});

Hangry = {
    loadData: function loadData(target, fetcher, file) {
        var that = this;

        fetcher.get(file)
            .then(function (response) {
                target.choices = that._bootstrapChoices(response.data);
                target.tags = that._bootstrapTags(that._getTagNames(target.choices));
            });

    },

    updateScores: function (tags, choices) {
        $.each(choices, function (i,choice) {
            choice.score = 0;
            $.each(tags, function (i, tag) {
                if (tag.selected && ($.inArray(tag.name, choice.tags) != -1)) {
                    choice.score += 1;
                }
            });
        });
    },

    _getTagNames: function getTagNames(choices) {
        tags = [];
        $.each(choices, function (i, choice) {
            $.merge(tags, choice.tags);
        });
        return $.unique(tags);
    },

    _bootstrapChoices: function bootstrapChoices (choices) {
        return $.map(choices, function (choice) {
            choice["score"] = 0;
            return choice;
        });
    },

    _bootstrapTags: function bootstrapTags(tags) {
        return $.map(tags, function (tag) {
            return { "name": tag, "selected": false}
        });
    },

};
