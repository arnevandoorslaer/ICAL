package ui;

import domain.*;

import java.util.ArrayList;
import java.util.Arrays;

public class CalendarUI {
    static final String NL = "\r\n";
    private static final MonthConverter mc = new MonthConverter();
    private final Calendar calendar;
    private final XMLReader xmlReader = new XMLReader("D:\\Users\\vando\\Documents\\Programming\\PersonalProjects\\ICAL\\src\\kalender.xml");
    private final ArrayList<String> activiteiten = xmlReader.getXmlArray();

    private final String[] geenActiviteit = {"GEEN ACTIVITEIT", "EXAMENS LEIDING"};
    private final String[] meerdaagse = {"WEEKEND", "KAMP", "OPKIKKER", "SLAAPFEESTJE"};

    private final String name;

    public CalendarUI(String name) {
        this.name = name;
        calendar = new Calendar(name);
    }

    public void fill(String begin, String end) {
        for (String item : activiteiten) {
            if (Character.isDigit(item.charAt(0))) {
                item = "Zaterdag " + item;
            }
            String[] activiteit = item.split("TAB");

            String dag = mc.fixDate(activiteit[0].split(" ")[1]);
            String maand = mc.convert(activiteit[0].split(" ")[2]);
            String jaar = Integer.parseInt(maand) < 12 && Integer.parseInt(maand) > 8 ? begin : end;

            String naam = activiteit[1];
            String locatie = "";
            String wie;
            String extra = "";

            String DTSTART;
            String DTEND;

            if (!Arrays.asList(geenActiviteit).contains(naam.toUpperCase())) {
                locatie = activiteit[2].replace('–', '-');
                wie = activiteit[3];

                try {
                    String H = locatie.split("- ")[0].replaceAll("\\D+", "");
                    DTSTART = jaar + maand + dag + "T" + H + "0000";
                } catch (ArrayIndexOutOfBoundsException e) {
                    DTSTART = jaar + maand + dag + "T" + "000000";
                }
                try {
                    String H = locatie.split("- ")[1].replaceAll("\\D+", "");
                    DTEND = jaar + maand + dag + "T" + H + "0000";
                } catch (ArrayIndexOutOfBoundsException e) {
                    DTEND = jaar + maand + dag + "T" + "235959";
                }

                locatie = "Waar: " + locatie.split(":")[0];
                try {
                    extra = "Extra:\\n" + activiteit[4] + "\\nWie: " + wie;
                } catch (ArrayIndexOutOfBoundsException e) {
                    if (wie.charAt(0) == 'v') {
                        extra = "Extra: " + wie;
                    } else {
                        extra = "Wie: " + wie;
                    }
                }

            } else {
                DTSTART = jaar + maand + dag + "T" + "000000";
                DTEND = jaar + maand + dag + "T" + "235959";
            }

            if (Arrays.asList(meerdaagse).contains(naam.toUpperCase())) {
                String smaand = maand;
                String emaand = mc.convert(activiteit[0].split(" ")[activiteit[0].split(" ").length - 1]);
                String sdatum = mc.fixDate(dag);
                String edatum = mc.fixDate(incrementString(activiteit[0].split(activiteit[0].contains("-") ? "-" : "t.e.m.")[1].replaceAll("\\D+", "")));

                DTSTART = jaar + smaand + sdatum;// + "T" + "000000";
                DTEND = jaar + emaand + edatum;// + "T" + "235959";
            }

            Event tempEvent = new Event(DTSTART, DTEND, naam, extra, locatie);
            System.out.println(tempEvent);
            calendar.addEvent(tempEvent);
        }
    }

    public void write() {
        Writer writer = new Writer();
        writer.write(name, calendar);
    }

    private String incrementString(String text) {
        return String.valueOf(Integer.parseInt(text) + 1);
    }
}
