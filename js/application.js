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

    uniqueMatch: function uniqueMatch(query, tags) {
        var matches = [];
        $.each(tags, function(i, tag) {
            if (tag.isMatch(query)) {
                matches.push(tag);
            }
        });
        if (matches.length == 1) {
            return matches[0]
        }
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

    _getTagNames: function getTagNames(choices) {
        var tags = [];
        $.each(choices, function (i, choice) {
            $.merge(tags, choice.tags);
        });
        return tags.filter(function (tag, index, array) {
            return index == array.indexOf(tag);
        });
    },

    _bootstrapChoices: function bootstrapChoices(choices) {
        return $.map(choices, function (choice) {
            choice["score"] = 0;
            choice["style"] = {display: "none"};
            return choice;
        });
    },

    _bootstrapTags: function bootstrapTags(tags) {
        return $.map(tags, function (tagName) {
            return new Hangry.Tag(tagName);
        });
    }
};
