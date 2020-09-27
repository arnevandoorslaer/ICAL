package domain;

public class MonthConverter {
    public String convert(String month) {
        String MONTH = month.toUpperCase();
        return switch (MONTH) {
            case "JANUARI" -> "01";
            case "FEBRUARI" -> "02";
            case "MAART" -> "03";
            case "APRIL" -> "04";
            case "MEI" -> "05";
            case "JUNI" -> "06";
            case "JULI" -> "07";
            case "AUGUSTUS" -> "08";
            case "SEPTEMBER" -> "09";
            case "OKTOBER" -> "10";
            case "NOVEMBER" -> "11";
            case "DECEMBER" -> "12";
            default -> "00";
        };
    }

    public String fixDate(String month){
        if (Integer.parseInt(month) < 10) {
            month = "0" + month;
        }
        return month;
    }
}
