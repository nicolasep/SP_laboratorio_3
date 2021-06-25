class Camioneta extends Vehiculo {
    private esCuatroXCuatro: boolean;

    public constructor(id: number, marca: string, modelo: string, precio: number, esCuatroXCuatro: boolean) {
        super(id, marca, modelo, precio);
        this.esCuatroXCuatro = esCuatroXCuatro;
    }

}