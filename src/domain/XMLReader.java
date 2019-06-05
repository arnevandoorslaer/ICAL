package domain;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;

public class XMLReader {
    ArrayList<String> xmlArray = new ArrayList<>();

    public XMLReader(String filename) {
        try {
            File file = new File(filename);
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            Document document = documentBuilder.parse(file);
            int i = 1;
            while (document.getElementsByTagName("Row").item(i).getTextContent() != null) {
                String data = document.getElementsByTagName("Row").item(i).getTextContent();
                data = data.replaceAll("\n", "").trim().replaceAll("\\s{2,}", "TAB").trim();
                if (!(data == null || data.isEmpty())) {
                    xmlArray.add(data);
                }
                i++;
            }

        } catch (Exception e) {
            System.out.println("90");
        }
    }

    public ArrayList<String> getXmlArray() {
        return xmlArray;
    }
}
