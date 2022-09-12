import readXlsxFile from "read-excel-file/node";
import ical from 'ical-generator'
import { Activiteit } from "./activiteit";


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
  // console.log(formatted.filter(activiteit => activiteit.beginMaand == 'juli'))
  console.log(formatted)
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

  formatActiviteit.beginDag = beginDag
  formatActiviteit.beginMaand = beginMaand;

  const splittedEindDatum = formatActiviteit.eindDatum ? formatActiviteit.eindDatum.split(' ') : [];

  if(splittedEindDatum.length === 3) {
    splittedEindDatum.shift() 
  }

  const [eindDag,eindMaand] = splittedEindDatum;

  formatActiviteit.eindDag = eindDag
  formatActiviteit.eindMaand = eindMaand;

  return formatActiviteit
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