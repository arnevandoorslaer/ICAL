package application;

import ui.CalendarUI;

public class CalLauncher {
    public static void main(String[] args) {
        CalendarUI calendarUI = new CalendarUI("KLJKalender");
        calendarUI.fill("2020", "2021");
        calendarUI.write();
    }
}
