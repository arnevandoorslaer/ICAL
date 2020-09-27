package domain;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Writer {
    public void write(String name, Calendar calendar) {
        StringBuilder builder = new StringBuilder();
        builder.append(name);
        builder.append(".ics");

        try {
            File file = new File(builder.toString());
            if (!file.exists()) {
                file.createNewFile();
            }
            BufferedWriter bw = new BufferedWriter(new FileWriter(file.getAbsoluteFile()));
            bw.write(calendar.toString());
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
