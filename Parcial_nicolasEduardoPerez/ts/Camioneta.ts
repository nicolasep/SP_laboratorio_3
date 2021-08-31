class Camioneta extends Vehiculo {
    private esCuatroXCuatro: boolean;

    public constructor(id: number, marca: string, modelo: string, precio: number, esCuatroXCuatro: boolean) {
        super(id, marca, modelo, precio);
        this.esCuatroXCuatro = esCuatroXCuatro;
    }
    public CamionetaToJSON():JSON
    {
        let aux = super.VehiculoToString().split(" ");
        let jsonAux = {"id":Number(aux[0]),"marca":aux[1],"modelo":aux[2],"precio":Number(aux[3]),"esCuatroXCuatro":this.esCuatroXCuatro};

        return JSON.parse(JSON.stringify(jsonAux));
    }

}