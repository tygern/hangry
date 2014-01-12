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
            choice.score = 0;
            $.each(tags, function (i, tag) {
                if (tag.selected && ($.inArray(tag.name, choice.tags) != -1)) {
                    choice.score += 1;
                }
            });
        });
    },

    setStyles: function (choices, count) {
        $.each(choices, function (i, choice) {
            if (choice.score == 0) {
                choice.style = {display: "none"};
            } else {
                var opacity = Math.pow(choice.score / count, 2);
                choice.style = { opacity: opacity };
            }
        });
    },

    _bootstrapChoices: function bootstrapChoices(choices) {
        return $.map(choices, function (choice) {
            choice["score"] = 0;
            choice["style"] = {display: "none"};
            return choice;
        });
    }
};
