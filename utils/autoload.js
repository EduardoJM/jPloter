// this is the evaluate math function
function evaluate(expr, x) {
    // use the math.js
    return math.evaluate(expr, {
        x: x
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (jPlot === null || jPlot === undefined || math === null || math === undefined) {
        // return if the jPlot or the math.js is null or undefined
        return;
    }
    var items = document.querySelectorAll('canvas[data-jplot=true]');
    for (var i = 0; i < items.length; i += 1) {
        var content = items[i].dataset.content;
        if (content !== null && content !== undefined) {
            var view = jPlot.View.deserialize(content, items[i]);
            view.evaluate = evaluate;
            view.render();
        }
    }
});
