"use strict";
exports.__esModule = true;
exports.launch = void 0;
var node_1 = require("read-excel-file/node");
var activiteit_1 = require("./activiteit");
// File path.
function launch() {
    (0, node_1["default"])('kalender.xlsx').then(function (rows) {
        // `rows` is an array of rows
        // each row being an array of cells.
        createCalender(rows);
    });
}
exports.launch = launch;
function createCalender(rows) {
    var activiteiten = rows.splice(1);
    var formatted = activiteiten.map(function (activiteit) { return formatActiviteit(activiteit); }).filter(function (activiteit) { return activiteit; });
    // console.log(formatted.filter(activiteit => activiteit.beginMaand == 'juli'))
    console.log(formatted);
}
function formatActiviteit(activiteit) {
    if (activiteit.every(function (element) { return element === null; })) {
        return;
    }
    return createActiviteit(activiteit.map(function (element) { return element ? element.replace(/ +(?= )/g, '') : null; }));
}
function createActiviteit(activiteit) {
    var formatActiviteit = new activiteit_1.Activiteit(activiteit[0], activiteit[1], activiteit[2], activiteit[3], activiteit[4]);
    formatActiviteit.datum = formatActiviteit.datum.replace('t.e.m.', '-');
    var _a = formatActiviteit.plaats ? formatActiviteit.plaats.split(': ') : [], plaats = _a[0], uur = _a[1];
    formatActiviteit.plaats = plaats;
    formatActiviteit.uur = uur;
    var _b = uur ? uur.replace('–', '-').split(' - ') : [], beginUur = _b[0], eindUur = _b[1];
    formatActiviteit.beginUur = beginUur === null || beginUur === void 0 ? void 0 : beginUur.slice(0, -1);
    formatActiviteit.eindUur = eindUur === null || eindUur === void 0 ? void 0 : eindUur.slice(0, -1);
    var _c = formatActiviteit.datum ? formatActiviteit.datum.split('-') : [], beginDatum = _c[0], eindDatum = _c[1];
    formatActiviteit.beginDatum = beginDatum ? beginDatum.trim() : undefined;
    formatActiviteit.eindDatum = eindDatum ? eindDatum.trim() : undefined;
    var splittedBeginDatum = formatActiviteit.beginDatum ? formatActiviteit.beginDatum.split(' ') : [];
    if (splittedBeginDatum.length === 3) {
        splittedBeginDatum.shift();
    }
    var beginDag = splittedBeginDatum[0], beginMaand = splittedBeginDatum[1];
    formatActiviteit.beginDag = beginDag;
    formatActiviteit.beginMaand = beginMaand;
    var splittedEindDatum = formatActiviteit.eindDatum ? formatActiviteit.eindDatum.split(' ') : [];
    if (splittedEindDatum.length === 3) {
        splittedEindDatum.shift();
    }
    var eindDag = splittedEindDatum[0], eindMaand = splittedEindDatum[1];
    formatActiviteit.eindDag = eindDag;
    formatActiviteit.eindMaand = eindMaand;
    return formatActiviteit;
}
function createEvent(activiteit) {
}
// const calendar = ical({name: 'my first iCal'});
// const startTime = new Date();
// const endTime = new Date();
// endTime.setHours(startTime.getHours()+1);
// calendar.createEvent({
//     start: startTime,
//     end: endTime,
//     summary: 'Example Event',
//     description: 'It works ;)',
//     location: 'my room',
//     url: 'http://sebbo.net/'
// });
// console.log(calendar)
//# sourceMappingURL=main.js.map