class Camioneta extends Vehiculo
{
    private cuatroXcuatro:boolean;

    public constructor(id:number,marca:string,modelo:string,precio:number,cuatroXcuatro:boolean)
    {
        super(id,marca,modelo,precio);
        this.cuatroXcuatro = cuatroXcuatro;
    }
    public get CuatroXcuatro():boolean
    {
        return this.cuatroXcuatro;
    }
}