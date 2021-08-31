
class Vehiculo
{
    private id:number;
    private marca:string;
    private modelo:string;
    private precio:number;

    public constructor(id:number,marca:string,modelo:string,precio:number)
    {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
    public get GetId():number
    {
        return this.id;
    }
    public get GetMarca():string
    {
        return this.marca;
    }
    public get GetModelo():string
    {
        return this.modelo;
    }
    public get GetPrecio():number
    {
        return this.precio;
    }
}