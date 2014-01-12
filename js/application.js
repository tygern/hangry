var hangryApp = angular.module('hangryApp', []);

hangryApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

Hangry = {
    loadData: function loadData(target, fetcher, file) {
        var that = this;

        fetcher.get(file)
            .then(function (response) {
                target.choices = that._bootstrapChoices(response.data);
                target.tagCollection = new Hangry.TagCollection(target.choices);
            });

    },

    updateScores: function (tags, choices) {
        $.each(choices, function (i, choice) {
            choice.setScoreFor(tags);
        });
    },

    setStyles: function (choices, count) {
        $.each(choices, function (i, choice) {
            choice.setStyle(count);
        });
    },

    _bootstrapChoices: function bootstrapChoices(choices) {
        return $.map(choices, function (choice) {
            return new Hangry.Choice(choice.name, choice.tags);
        });
    }
};
