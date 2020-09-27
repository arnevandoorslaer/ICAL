package domain;

import java.util.ArrayList;

public class Calendar {
    ArrayList<Event> events;

    private final String first;

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
        StringBuilder cal = new StringBuilder(first);
        for (Event event : events) {
            cal.append(event.toString());
        }
        cal.append("END:VCALENDAR");
        return cal.toString();
    }

    public String printHTML() {
        StringBuilder cal = new StringBuilder();
        String currentM = "september";
        cal.append("<div class=\"maand\">");
        cal.append("\n");
        cal.append("<h2>").append(currentM).append("</h2>");
        cal.append("\n");
        for (Event event : events) {
            if (!currentM.equals(event.getMaand())) {
                currentM = event.getMaand();
                cal.append("</div>");
                cal.append("\n");
                cal.append("<div class=\"maand\">");
                cal.append("\n");
                cal.append("<h2>").append(currentM).append("</h2>");
                cal.append("\n");
            }
            cal.append(event.printHTML());
            cal.append("\n");
        }
        return cal.toString();
    }
}
