package domain;

import java.util.Objects;

public class Event {
    private String DTSTART;
    private String DTEND;
    private String UID;
    private String SUMMARY;
    private String DESCRIPTION;
    private String LOCATION;

    public Event(String DTSTART, String DTEND, String SUMMARY, String DESCRIPTION, String LOCATION) {
        setDTSTART(DTSTART);
        setDTEND(DTEND);
        setSUMMARY(SUMMARY);
        setDESCRIPTION(DESCRIPTION);
        setLOCATION(LOCATION);
        setUID(hashCode() + "@" + SUMMARY);
    }

    private void setDTSTART(String DTSTART) {
        this.DTSTART = DTSTART;
    }

    private void setDTEND(String DTEND) {
        this.DTEND = DTEND;
    }

    private void setUID(String UID) {
        this.UID = UID;
    }

    private void setSUMMARY(String SUMMARY) {
        this.SUMMARY = SUMMARY;
    }

    private void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }

    private void setLOCATION(String LOCATION) {
        this.LOCATION = LOCATION;
    }

    @Override
    public int hashCode() {
        return Objects.hash(DTSTART, DTEND, SUMMARY, DESCRIPTION, LOCATION);
    }

    @Override
    public String toString() {
        if (DTEND.substring(DTEND.length() - 6).equals("235959")) {
            return "BEGIN:VEVENT" + '\n' +
                    "DTSTAMP:" + DTSTART + '\n' +
                    "UID:" + UID + '\n' +
                    "DTSTART;TZID=\"Europe/Berlin\":" + DTSTART.substring(0,DTSTART.length()-7) + '\n' +
                    "DTEND;TZID=\"Europe/Berlin\":" + DTEND.substring(0,DTSTART.length()-7) + '\n' +
                    "SUMMARY:" + SUMMARY + '\n' +
                    "DESCRIPTION:" + DESCRIPTION + '\n' +
                    "LOCATION:" + LOCATION + '\n' +
                    "END:VEVENT" + '\n';
        } else {
            return "BEGIN:VEVENT" + '\n' +
                    "DTSTAMP:" + DTSTART + '\n' +
                    "UID:" + UID + '\n' +
                    "DTSTART;TZID=\"Europe/Berlin\":" + DTSTART + '\n' +
                    "DTEND;TZID=\"Europe/Berlin\":" + DTEND + '\n' +
                    "SUMMARY:" + SUMMARY + '\n' +
                    "DESCRIPTION:" + DESCRIPTION + '\n' +
                    "LOCATION:" + LOCATION + '\n' +
                    "END:VEVENT" + '\n';
        }
    }
}
