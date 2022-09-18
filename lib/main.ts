import readXlsxFile from 'read-excel-file/node';
import { Calender } from './calender';

const jaar = {
  begin: new Date().getFullYear(),
  eind: new Date().getFullYear() + 1,
};

const calender = new Calender(jaar);

export function launch() {
  readXlsxFile('kalender.xlsx').then((rows) => {
    calender.createCalender(rows);
  });
}