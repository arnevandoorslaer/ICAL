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
}