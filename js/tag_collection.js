Hangry.TagCollection = function TagCollection(choices) {
    var tagNames = [];
    this.count = 0;

    var that = this

    $.each(choices, function (i, choice) {
        $.merge(tagNames, choice.tagNames);
    });

    tagNames = tagNames.filter(function (tag, index, array) {
        return index == array.indexOf(tag);
    });

    this.tags = $.map(tagNames, function (tagName) {
        return new Hangry.Tag(tagName);
    });

    this.findUniqueMatch = function findUniqueMatch(query) {
        var matches = [];
        $.each(this.tags, function(i, tag) {
            if (tag.isMatch(query)) {
                matches.push(tag);
            }
        });
        if (matches.length == 1) {
            matches[0].match = true;
        } else {
            this.clearMatches();
        }
    };

    this.toggleMatches = function toggleMatches() {
        $.each(this.tags, function (i, tag) {
            if (tag.match) {
                that.toggle(tag);
            }
        });
    };

    this.toggle = function toggle(tag) {
        if (tag.selected) {
            this.count -= 1;
        } else {
            this.count += 1;
        }

        tag.selected = !tag.selected;
    };

    this.clearMatches = function clearMatches() {
        $.each(this.tags, function (i, tag) {
            tag.match = false;
        });
    };

    this.clearSelected = function clearSelected() {
        $.each(this.tags, function (i, tag) {
            tag.selected = false;
        });
        this.count = 0;
    }
};