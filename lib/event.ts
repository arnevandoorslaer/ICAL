import { v4 } from "uuid";

export class ActiviteitEvent {
  constructor(
    public DTSTART: string,
    public DTEND: string,
    public SUMMARY: string,
    public LOCATION: string,
    public DESCRIPTION: string
  ){}

  public toString() {
    if (this.DTEND.endsWith("235959")) {
        return "BEGIN:VEVENT" + '\n' +
                "DTSTAMP:" + this.DTSTART + '\n' +
                "UID:" + v4() + '\n' +
                "DTSTART;VALUE=DATE:" + this.DTSTART.substring(0, this.DTSTART.length - 7) + '\n' +
                "DTEND;VALUE=DATE:" + this.DTEND.substring(0, this.DTSTART.length - 7) + '\n' +
                "SUMMARY:" + this.SUMMARY + '\n' +
                "DESCRIPTION:" + this.DESCRIPTION + '\n' +
                "LOCATION:" + this.LOCATION + '\n' +
                "END:VEVENT" + '\n';
    } else {
        return "BEGIN:VEVENT" + '\n' +
                "DTSTAMP:" + this.DTSTART + '\n' +
                "UID:" + v4() + '\n' +
                "DTSTART;VALUE=DATE:" + this.DTSTART + '\n' +
                "DTEND;VALUE=DATE:" + this.DTEND + '\n' +
                "SUMMARY:" + this.SUMMARY + '\n' +
                "DESCRIPTION:" + this.DESCRIPTION + '\n' +
                "LOCATION:" + this.LOCATION + '\n' +
                "END:VEVENT" + '\n';
    }
  } 
  
}