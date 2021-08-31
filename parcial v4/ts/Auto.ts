class Auto extends Vehiculo
{
    private cantidadPuertas:number;

    public constructor(id:number, marca:string,modelo:string,precio:number,cantidadPuertas:number)
    {
        super(id,marca,modelo,precio);
        this.cantidadPuertas = cantidadPuertas;
    }

    public get CantidadPuertas():number
    {
        return this.cantidadPuertas;
    }
}