Hangry.TagCollection = function TagCollection(choices) {
    var tagNames = [];

    $.each(choices, function (i, choice) {
        $.merge(tagNames, choice.tags);
    });

    tagNames = tagNames.filter(function (tag, index, array) {
        return index == array.indexOf(tag);
    });

    this.tags = $.map(tagNames, function (tagName) {
        return new Hangry.Tag(tagName);
    });



};