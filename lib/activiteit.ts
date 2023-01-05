export class Activiteit {

  public uur: string;
  public beginUur: string;
  public eindUur: string;
  public beginDatum: string;
  public eindDatum: string;
  public beginDag: string;
  public beginMaand: string;
  public eindDag: string;
  public eindMaand: string;
  public jaar: string;
  constructor(
    public datum: string,
    public activiteit: string,
    public plaats: string,
    public leeftijdsgroep: string,
    public meebrengen: string)
    { }

    public printHTML() {
      let result = "<div>";
      result += "<p>" + this.datum + "</p>";
      result += "<p>" + this.activiteit + "</p>";
      result += this.plaats ? "<p>" + this.plaats + "</p>" : "<p></p>";
      result += this.leeftijdsgroep  ? "<p>" +this.leeftijdsgroep + "</p>" : "<p></p>";
      result += this.meebrengen ? "<p>" + this.meebrengen + "</p>" : "<p></p>";
      result += "</div>";
      return result;
  }
}