class Vehiculo {
    private id: number;
    private marca: string;
    private modelo: string;
    private precio: number;

    public constructor(id: number, marca: string, modelo: string, precio: number) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
}