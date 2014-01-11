var hangryApp = angular.module('hangryApp', []);

hangryApp.controller('PickerController', function ($scope, $http) {
    $scope.choices = [];
    $scope.tags = [];

    Hangry.loadData($scope, $http, 'data/restaurants.json');

    $scope.toggle = function toggle(item) {
        item.selected = !item.selected;
    }

});

Hangry = {
    loadData: function loadData(target, fetcher, file) {
        var that = this;

        fetcher.get(file)
            .then(function (response) {
                target.choices = response.data;
                $.each(target.choices, function (i, choice) {
                    $.unique($.merge(target.tags, choice.tags));
                });
                target.tags = that.bootstrapTags(target.tags)
            });

    },

    bootstrapTags: function bootstrapTags(tags) {
        return $.map(tags, function (tag) {
            return { "name": tag, "selected": false}
        });
    }
};
