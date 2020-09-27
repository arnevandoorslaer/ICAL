package domain;

import java.util.Objects;

public class Event {
    private String DTSTART;
    private String DTEND;
    private String UID;
    private String SUMMARY;
    private String DESCRIPTION;
    private String LOCATION;
    private String[] activiteit;

    public Event(String DTSTART, String DTEND, String SUMMARY, String DESCRIPTION, String LOCATION, String[] activiteit) {
        setDTSTART(DTSTART);
        setDTEND(DTEND);
        setSUMMARY(SUMMARY);
        setDESCRIPTION(DESCRIPTION);
        setLOCATION(LOCATION);
        setUID(hashCode() + "@" + SUMMARY);
        setActiviteit(activiteit);
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

    public void setActiviteit(String[] activiteit) {
        this.activiteit = activiteit;
    }

    @Override
    public int hashCode() {
        return Objects.hash(DTSTART, DTEND, SUMMARY, DESCRIPTION, LOCATION);
    }

    @Override
    public String toString() {
        if (DTEND.endsWith("235959")) {
            return "BEGIN:VEVENT" + '\n' +
                    "DTSTAMP:" + DTSTART + '\n' +
                    "UID:" + UID + '\n' +
                    "DTSTART;TZID=\"Europe/Berlin\":" + DTSTART.substring(0, DTSTART.length() - 7) + '\n' +
                    "DTEND;TZID=\"Europe/Berlin\":" + DTEND.substring(0, DTSTART.length() - 7) + '\n' +
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

    public String printHTML() {
        System.out.println(DTSTART.substring(4,6));
        String result = "";
        result += "<p>" + activiteit[0] + "</p>";
        result += "<p>" + activiteit[1] + "</p>";
        result += activiteit.length == 3 ? "<p>" + activiteit[2] + "</p>" : "<p></p>";
        result += activiteit.length == 4 ? "<p>" + activiteit[3] + "</p>" : "<p></p>";
        result += activiteit.length == 5 ? "<p>" + activiteit[4] + "</p>" : "<p></p>";
        return result;
    }
}
