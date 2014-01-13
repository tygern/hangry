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
        fetcher.get(file)
            .then(function (response) {
                target.choiceCollection = new Hangry.ChoiceCollection(response.data);
                target.tagCollection = new Hangry.TagCollection(target.choiceCollection.choices);
            });
    }
};
