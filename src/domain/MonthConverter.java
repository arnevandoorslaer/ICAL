package domain;

public class MonthConverter {
    public String convert(String month) {
        String MONTH = month.toUpperCase();
        switch (MONTH) {
            case "JANUARI":
                return "01";
            case "FEBRUARI":
                return "02";
            case "MAART":
                return "03";
            case "APRIL":
                return "04";
            case "MEI":
                return "05";
            case "JUNI":
                return "06";
            case "JULI":
                return "07";
            case "AUGUSTUS":
                return "08";
            case "SEPTEMBER":
                return "09";
            case "OKTOBER":
                return "10";
            case "NOVEMBER":
                return "11";
            case "DECEMBER":
                return "12";
            default:
                return "00";
        }
    }
}
