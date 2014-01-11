var hangryApp = angular.module('hangryApp', []);

Hangry = {
    loadData: function loadData(target, fetcher, file) {
        var that = this;

        fetcher.get(file)
            .then(function (response) {
                target.choices = that._bootstrapChoices(response.data);
                target.tags = that._bootstrapTags(that._getTagNames(target.choices));
            });

    },

    updateScores: function (tags, choices, count) {
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
                choice.style = {opacity: opacity};
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
        return $.map(tags, function (tag) {
            return { "name": tag, "selected": false}
        });
    }
};
