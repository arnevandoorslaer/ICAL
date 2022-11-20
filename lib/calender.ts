import { Activiteit } from "./activiteit";
import { ActiviteitEvent } from "./event";
import { Month } from "./month";
import * as fs from 'fs';

export class Calender {

  private first =
  'BEGIN:VCALENDAR\n' +
  'VERSION:2.0\n' +
  'PRODID:-//www.marudot.com//iCal Event Maker\n' +
  'X-WR-CALNAME:' +
  'KLJKalender' +
  '\n' +
  'CALSCALE:GREGORIAN\n' +
  'BEGIN:VTIMEZONE\n' +
  'TZID:Europe/Berlin\n' +
  'TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin\n' +
  'X-LIC-LOCATION:Europe/Berlin\n' +
  'BEGIN:DAYLIGHT\n' +
  'TZOFFSETFROM:+0100\n' +
  'TZOFFSETTO:+0200\n' +
  'TZNAME:CEST\n' +
  'DTSTART:19700329T020000\n' +
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\n' +
  'END:DAYLIGHT\n' +
  'BEGIN:STANDARD\n' +
  'TZOFFSETFROM:+0200\n' +
  'TZOFFSETTO:+0100\n' +
  'TZNAME:CET\n' +
  'DTSTART:19701025T030000\n' +
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\n' +
  'END:STANDARD\n' +
  'END:VTIMEZONE\n';

  constructor(private jaar) {}

  createCalender(rows) {
    const activiteiten = rows.splice(1);
  
    const formatted = activiteiten
      .map((activiteit) => this.formatActiviteit(activiteit))
      .filter((activiteit) => activiteit);
    const events = formatted.map((activiteit) => this.createEvent(activiteit));
  
    const calender = (this.first + events.join('\n') + '\nEND:VCALENDAR').replace(
      /\n+/g,
      '\n',
    );
  
    fs.writeFile('KLJKalender.ics', calender, (err) => {});
    fs.writeFile('index.html', formatted[0].printHTML(), (err) => {});
  }
  
   formatActiviteit(activiteit) {
    if (activiteit.every((element) => element === null)) {
      return;
    }
  
    return this.createActiviteit(
      activiteit.map((element) =>
        element ? element.replace(/ +(?= )/g, '') : null,
      ),
    );
  }
  
   createActiviteit(activiteit) {
    const formatActiviteit = new Activiteit(
      activiteit[0],
      activiteit[1],
      activiteit[2],
      activiteit[3],
      activiteit[4],
    );
  
    formatActiviteit.datum = formatActiviteit.datum.replace('t.e.m.', '-');
  
    const [plaats, uur] = formatActiviteit.plaats
      ? formatActiviteit.plaats.split(': ')
      : [];
  
    formatActiviteit.plaats = plaats;
    formatActiviteit.uur = uur;
  
    const [beginUur, eindUur] = uur ? uur.replace('–', '-').split(' - ') : [];
  
    formatActiviteit.beginUur = beginUur?.slice(0, -1);
    formatActiviteit.eindUur = eindUur?.slice(0, -1);
  
    const [beginDatum, eindDatum] = formatActiviteit.datum
      ? formatActiviteit.datum.split('-')
      : [];
  
    formatActiviteit.beginDatum = beginDatum ? beginDatum.trim() : undefined;
    formatActiviteit.eindDatum = eindDatum ? eindDatum.trim() : undefined;
  
    const splittedBeginDatum = formatActiviteit.beginDatum
      ? formatActiviteit.beginDatum.split(' ')
      : [];
  
    if (splittedBeginDatum.length === 3) {
      splittedBeginDatum.shift();
    }
  
    const [beginDag, beginMaand] = splittedBeginDatum;
  
    formatActiviteit.beginDag = beginDag.length === 1 ? '0' + beginDag : beginDag;
    formatActiviteit.beginMaand = Month[beginMaand];
  
    const splittedEindDatum = formatActiviteit.eindDatum
      ? formatActiviteit.eindDatum.split(' ')
      : [];
  
    if (splittedEindDatum.length === 3) {
      splittedEindDatum.shift();
    }
  
    const [eindDag, eindMaand] = splittedEindDatum;
  
    formatActiviteit.eindDag = eindDag
      ? eindDag.length === 1
        ? '0' + eindDag
        : eindDag
      : undefined;
    formatActiviteit.eindMaand = Month[eindMaand];
  
    formatActiviteit.jaar =
      Number(formatActiviteit.beginMaand) >= 9 ? this.jaar.begin.toString() : this.jaar.eind.toString();
  
    return formatActiviteit;
  }
  
   createEvent(activiteit) {
    const startDate =
      activiteit.jaar + activiteit.beginMaand + activiteit.beginDag;
    const endDate = activiteit.eindMaand
      ? activiteit.jaar + activiteit.eindMaand + activiteit.eindDag
      : startDate;
  
    let DTSTART;
    let DTEND;
  
    if (!activiteit.beginUur) {
      DTSTART = startDate + 'T' + '000000';
      DTEND = endDate + 'T' + '235959';
    }
  
    if (activiteit.eindUur) {
      DTSTART = startDate + 'T' + activiteit.beginUur + '0000';
      DTEND = endDate + 'T' + activiteit.eindUur + '0000';
    }
  
    if (activiteit.eindMaand) {
      DTSTART = startDate + 'T' + '000000';
      DTEND = Number(endDate) + 1 + 'T' + '235959';
    }
  
    const DESCRIPTION = (
      (activiteit.leeftijdsgroep ? 'Wie: ' + activiteit.leeftijdsgroep : '') +
      (activiteit.meebrengen ? 'Extra: ' + activiteit.meebrengen : '')
    ).trim();
    const SUMMARY = activiteit.activiteit ?? '';
    const LOCATION = activiteit.plaats ? 'Waar: ' + activiteit.plaats : '';
  
    return new ActiviteitEvent(DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION);
  }
}