package ui;

import domain.*;

import java.util.ArrayList;

public class CalendarUI {
    static final String NL = "\r\n";
    private static MonthConverter mc = new MonthConverter();
    private Calendar calendar;
    private XMLReader xmlReader = new XMLReader("/Users/arnevandoorslaer/OneDriveUCLL/Free-Time/src/kalender.xml");
    private ArrayList<String> activiteitenArray = xmlReader.getXmlArray();

    public CalendarUI(String name) {
        calendar = new Calendar(name);
        fill();
        Writer writer = new Writer();
        writer.write(name, calendar);
    }

    private void fill() {
        for (int i = 0; i < activiteitenArray.size(); i++) {
            String temp = activiteitenArray.get(i);
            String[] activiteitArray = temp.split("TAB");
            String datum = activiteitArray[0].split(" ")[1];
            if (Integer.parseInt(datum) < 10) {
                datum = "0" + datum;
            }
            String maand = activiteitArray[0].split(" ")[2];
            maand = mc.convert(maand);
            String naam = activiteitArray[1];
            String locatie = "";
            String wie = "";
            String extra = "";

            String DTSTART = "";
            String DTEND = "";


            String jaar = Integer.parseInt(maand) < 12 && Integer.parseInt(maand) > 8 ? "2018" : "2019";
            if (!(naam.equals("GEEN ACTIVITEIT") || naam.equals("GEEN ACTIVITEIT wegens examens leiding"))) {
                locatie = activiteitArray[2];
                locatie = locatie.replace('–', '-');
                try {
                    String H = locatie.split(": ")[1].substring(0, 2);
                    try {
                        Integer.parseInt(H);
                    } catch (NumberFormatException e) {
                        H = 0 + H.substring(0, 1);
                    }
                    DTSTART = jaar + maand + datum + "T" + H + "0000";
                } catch (ArrayIndexOutOfBoundsException e) {
                    DTSTART = jaar + maand + datum + "T" + "000000";
                }
                try {
                    String H = locatie.split("- ")[1].substring(0, 2);
                    try {
                        Integer.parseInt(H);
                    } catch (NumberFormatException e) {
                        H = 0 + H.substring(0, 1);
                    }
                    DTEND = jaar + maand + datum + "T" + H + "0000";
                } catch (ArrayIndexOutOfBoundsException e) {
                    DTEND = jaar + maand + datum + "T" + "235959";
                }

                locatie = locatie.split(":")[0];
                wie = activiteitArray[3];
                try {
                    extra = activiteitArray[4] + "," + wie;
                } catch (ArrayIndexOutOfBoundsException e) {
                    extra = wie;
                }

            } else {
                DTSTART = jaar + maand + datum + "T" + "000000";
                DTEND = jaar + maand + datum + "T" + "235959";
            }
            if (naam.equals("Weekend") || naam.equals("KAMP")) {
                String sdatum = activiteitArray[0].split(" ")[1];
                String edatum = activiteitArray[0].split("t.e.m.")[1];
                edatum = edatum.substring(edatum.indexOf('g') + 2);
                edatum = edatum.split(" ")[0];
                if (Integer.parseInt(edatum) < 10) {
                    edatum = "0" + edatum;
                }
                if (Integer.parseInt(sdatum) < 10) {
                    sdatum = "0" + sdatum;
                }
                DTSTART = jaar + maand + sdatum + "T" + "000000";
                DTEND = jaar + maand + edatum + "T" + "235959";
            }

            Event tempEvent = new Event(DTSTART, DTEND, naam, extra, locatie);
            calendar.addEvent(tempEvent);

        }
    }
}
