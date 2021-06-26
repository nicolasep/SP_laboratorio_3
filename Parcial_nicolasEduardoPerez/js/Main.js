"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    var checksId = document.getElementById("mostrarId");
    checksId.addEventListener("change", main);
    var checksMarca = document.getElementById("mostrarMarca");
    checksMarca.addEventListener("change", main);
    var checksModelo = document.getElementById("mostrarModelo");
    checksModelo.addEventListener("change", main);
    var checksPrecio = document.getElementById("mostrarPrecio");
    checksPrecio.addEventListener("change", main);
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);
});
var Main = /** @class */ (function () {
    function Main() {
        this.listaVehiculos = new Array();
    }
    Main.prototype.handleEvent = function (event) {
        var ev = event.target;
        if (ev.value == "Agregar") {
            Funciones.$("contGrilla").style.display = "block";
        }
    };
    Main.prototype.CargarVehiculo = function () {
        Funciones.$("marca").value = "";
        Funciones.$("modelo").value = "";
        Funciones.$("precio").value = "";
        var btnGuardar = Funciones.$("btnGuardar");
        btnGuardar.onclick = function () {
            var marca = Funciones.$("marca").value;
            var modelo = Funciones.$("modelo").value;
            var precio = Funciones.$("precio").value;
        };
    };
    return Main;
}());
