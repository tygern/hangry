$(document).ready(function () {
    var data = $('.data');

    data.on('loaded', function () {
        alert('loaded');
    });

    readTextFile = function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
                data.text(rawFile.responseText);
                data.trigger('loaded');
            }
        }
        rawFile.send(null);
    };

    readTextFile('data/restaurants.json');
});
