package domain;

import java.util.ArrayList;

public class Calendar {
    ArrayList<Event> events;

    private String first;

    public Calendar(String name) {
        events = new ArrayList<>();
        first = "BEGIN:VCALENDAR\n" +
                "VERSION:2.0\n" +
                "PRODID:-//www.marudot.com//iCal Event Maker\n" +
                "X-WR-CALNAME:" + name + "\n" +
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
    }

    public void addEvent(Event event) {
        events.add(event);
    }

    @Override
    public String toString() {
        String cal = first;
        for (Event event : events) {
            cal += event.toString();
        }
        cal += "END:VCALENDAR";
        return cal;
    }
}
