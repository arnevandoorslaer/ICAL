import readXlsxFile from "read-excel-file/node";
import { Activiteit } from "./activiteit";
import { Month } from "./month";
import { ActiviteitEvent } from "./event";
import * as fs from 'fs';

const jaar = {begin:'2022',eind:'2023'}

const first = "BEGIN:VCALENDAR\n" +
"VERSION:2.0\n" +
"PRODID:-//www.marudot.com//iCal Event Maker\n" +
"X-WR-CALNAME:" + 'KLJKalender' + "\n" +
"CALSCALE:GREGORIAN\n" +
"BEGIN:VTIMEZONE\n" +
"TZID:Europe/Berlin\n" +
"TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin\n" +
"X-LIC-LOCATION:Europe/Berlin\n" +
"BEGIN:DAYLIGHT\n" +
"TZOFFSETFROM:+0100\n" +
"TZOFFSETTO:+0200\n" +
"TZNAME:CEST\n" +
"DTSTART:19700329T020000\n" +
"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\n" +
"END:DAYLIGHT\n" +
"BEGIN:STANDARD\n" +
"TZOFFSETFROM:+0200\n" +
"TZOFFSETTO:+0100\n" +
"TZNAME:CET\n" +
"DTSTART:19701025T030000\n" +
"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\n" +
"END:STANDARD\n" +
"END:VTIMEZONE\n";

// File path.
export function launch() {
  readXlsxFile('kalender.xlsx').then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    createCalender(rows)
  })
}

function createCalender(rows) {

  const activiteiten = rows.splice(1)

  const formatted = activiteiten.map(activiteit => formatActiviteit(activiteit)).filter(activiteit => activiteit);
  const events = formatted.map(activiteit => createEvent(activiteit))

  const calender = (first + events.join('\n') + '\nEND:VCALENDAR').replace(/\n+/g,'\n');


  fs.writeFile('kalender.ics', calender, (err) => {})
  console.log(calender)

  // console.log(events.map(event => event.toString()))
}


function formatActiviteit(activiteit) {

  if(activiteit.every(element => element === null)) {
    return;
  }
  
  return createActiviteit(activiteit.map(element => element ? element.replace(/ +(?= )/g,'') : null))

}

function createActiviteit(activiteit) {

  const formatActiviteit = new Activiteit(activiteit[0],activiteit[1],activiteit[2],activiteit[3],activiteit[4])

  formatActiviteit.datum = formatActiviteit.datum.replace('t.e.m.','-')

  const [plaats,uur] = formatActiviteit.plaats ? formatActiviteit.plaats.split(': ') : [];

  formatActiviteit.plaats = plaats;
  formatActiviteit.uur = uur;
  
  const [beginUur,eindUur] = uur ? uur.replace('–', '-').split(' - ') : [];

  formatActiviteit.beginUur = beginUur?.slice(0,-1);
  formatActiviteit.eindUur = eindUur?.slice(0,-1);

  const [beginDatum,eindDatum] = formatActiviteit.datum ? formatActiviteit.datum.split('-') : [];

  formatActiviteit.beginDatum = beginDatum ? beginDatum.trim() : undefined;
  formatActiviteit.eindDatum = eindDatum ? eindDatum.trim() : undefined;

  const splittedBeginDatum = formatActiviteit.beginDatum ? formatActiviteit.beginDatum.split(' ') : [];

  if(splittedBeginDatum.length === 3) {
    splittedBeginDatum.shift() 
  }

  const [beginDag,beginMaand] = splittedBeginDatum;

  formatActiviteit.beginDag = beginDag.length === 1 ? '0' + beginDag : beginDag;
  formatActiviteit.beginMaand = Month[beginMaand];

  const splittedEindDatum = formatActiviteit.eindDatum ? formatActiviteit.eindDatum.split(' ') : [];

  if(splittedEindDatum.length === 3) {
    splittedEindDatum.shift() 
  }

  const [eindDag,eindMaand] = splittedEindDatum;

  formatActiviteit.eindDag = eindDag ? eindDag.length === 1 ? '0' + eindDag : eindDag : undefined;
  formatActiviteit.eindMaand = Month[eindMaand];

  formatActiviteit.jaar = Number(formatActiviteit.beginMaand) >= 9 ? jaar.begin : jaar.eind

  return formatActiviteit
}

function createEvent(activiteit) {

  const startDate = activiteit.jaar + activiteit.beginMaand + activiteit.beginDag;
  const endDate = activiteit.eindMaand ? activiteit.jaar + activiteit.eindMaand + activiteit.eindDag : startDate;

  let DTSTART;
  let DTEND;

  if(!activiteit.beginUur) {
    DTSTART = startDate +  "T" + "000000"
    DTEND = endDate + 'T' + '235959'
  }

  if(activiteit.eindUur) {
    DTSTART = startDate + "T" + activiteit.beginUur + "0000"
    DTEND = endDate + "T" + activiteit.eindUur + "0000"
  }

  if(activiteit.eindMaand) {
    DTSTART = startDate +  "T" + "000000"
    DTEND  = Number(endDate) + 1 +  "T" + "235959"
  }

  const DESCRIPTION = ((activiteit.leeftijdsgroep ? 'Wie: ' + activiteit.leeftijdsgroep : '') + (activiteit.meebrengen ? 'Extra: ' + activiteit.meebrengen : '')).trim();
  const SUMMARY = activiteit.activiteit ?? '';
  const LOCATION = activiteit.plaats ? 'Waar: ' + activiteit.plaats : '';

  return new ActiviteitEvent(DTSTART,DTEND,SUMMARY,LOCATION,DESCRIPTION);

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