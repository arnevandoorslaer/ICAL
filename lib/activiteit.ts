export class Activiteit {

  public uur;
  public beginUur;
  public eindUur;
  public beginDatum;
  public eindDatum;
  public beginDag;
  public beginMaand;
  public eindDag;
  public eindMaand;
  constructor(
    public datum: string,
    public activiteit: string,
    public plaats: string,
    public leeftijdsgroep: string,
    public meebrengen: string)
    { }
}