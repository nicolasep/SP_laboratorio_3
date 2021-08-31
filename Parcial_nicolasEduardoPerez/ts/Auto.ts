class Auto extends Vehiculo {
    private cantidadPuertas: number;

    public constructor(id: number, marca: string, modelo: string, precio: number, cantidadPuertas: number) {
        super(id, marca, modelo, precio);
        this.cantidadPuertas = cantidadPuertas;
    }
    public AutoToJSON():JSON
    {
        let aux = super.VehiculoToString().split(" ");
        let jsonAux = {"id":Number(aux[0]),"marca":aux[1],"modelo":aux[2],"precio":Number(aux[3]),"cantidadPuertas":Number(this.cantidadPuertas)};

        return JSON.parse(JSON.stringify(jsonAux));
    }

}