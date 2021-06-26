window.addEventListener("load", () => {
    let main = new Main();
    let checksId = <HTMLElement>document.getElementById("mostrarId");
    checksId.addEventListener("change", main);

    let checksMarca = <HTMLElement>document.getElementById("mostrarMarca");
    checksMarca.addEventListener("change", main);

    let checksModelo = <HTMLElement>document.getElementById("mostrarModelo");
    checksModelo.addEventListener("change", main);

    let checksPrecio = <HTMLElement>document.getElementById("mostrarPrecio");
    checksPrecio.addEventListener("change", main);

    let btnAgregar = <HTMLElement>document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);


});

class Main implements EventListenerObject {

    private listaVehiculos: Array<Vehiculo>;

    public constructor() {
        this.listaVehiculos = new Array();
    }

    public handleEvent(event: Event) {
        let ev = event.target;
        if ((<HTMLInputElement>ev).value == "Agregar") {
            Funciones.$("contGrilla").style.display = "block";
        }



    }
    public CargarVehiculo(): void {

        (<HTMLInputElement>Funciones.$("marca")).value = "";
        (<HTMLInputElement>Funciones.$("modelo")).value = "";
        (<HTMLInputElement>Funciones.$("precio")).value = "";

        let btnGuardar = Funciones.$("btnGuardar");

        btnGuardar.onclick = function () {

            let marca = (<HTMLInputElement>Funciones.$("marca")).value;
            let modelo = (<HTMLInputElement>Funciones.$("modelo")).value;
            let precio = (<HTMLInputElement>Funciones.$("precio")).value;




        }
    }
}