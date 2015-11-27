var printout = [];

// document.domain = "codeathonapp";

function submit() {
    var res = checker($('#write').html());
    var submit = $('.shell-submit');
    if (res) {
        submit.html("Done &#10003;");
        if (!parent.finished[lvl - 1]) {
            parent.finished[lvl - 1] = true;
            parent.score += difficulty * 10;
            var thumbnail = parent.$('.thumbnail.level' + lvl + " img");
            var newpic = thumbnail.attr("src").slice(0, -4) + "-done.png";
            thumbnail.attr("src", newpic);
            parent.$('#header .score').html("Score: " + parent.score)
        }
    } else {
        submit.html("Wrong &#10060;");
        setTimeout(function() {
            submit.html("Submit");
        }, 1000)
    }
    return res;
}

function check(text) {
    var results = [];
    inputs.forEach(function(e) {
        input1 = e;
        results.push(eval(text));
    });
    return arraysEqual(results, outputs);
}

function checkPairs(text) {
    var results = [];
    zip(input1s, input2s).forEach(function(e) {
        input1 = e[0];
        input2 = e[1];
        results.push(eval(text));
    });
    return arraysEqual(results, outputs);
}

function checkPrint(text) {
    var results = [];
    inputs.forEach(function(e) {
        input1 = e;
        eval(text);
        results.push(printout);
        printout = [];
    });
    return metaArrayEquals(results, outputs);
}

function checkPrintPairs(text) {
    var results = [];
    zip(input1s, input2s).forEach(function(e) {
        input1 = e[0];
        input2 = e[1];
        eval(text);
        results.push(printout);
        printout = [];
    });
    return metaArrayEquals(results, outputs);
}

function println(text) {
    printout.push(text);
}

function arraysEqual(a, b) {
    console.log(a);
    console.log(b);

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function metaArrayEquals(a, b) {
    console.log(a);
    console.log(b);

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (!arraysEqual(a[i], b[i])) return false;
    }
    return true;
}

function zip(a, b) {
    return a.map(function(e, i) {
        return [a[i], b[i]];
    });
}