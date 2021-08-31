"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    main.ListaInicial();
    var btnAgregar = Main.$("btnAgregar");
    btnAgregar === null || btnAgregar === void 0 ? void 0 : btnAgregar.addEventListener("click", main);
    var btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click", main);
    var optionTipo = Main.$("NselectTipo");
    optionTipo.addEventListener("change", main);
    var btnGuardar = Main.$("btnGuardar");
    btnGuardar.addEventListener("click", main);
    var checkId = Main.$("mostrarId");
    checkId.addEventListener("change", main);
    var checkMarca = Main.$("mostrarMarca");
    checkMarca.addEventListener("change", main);
    var checkModelo = Main.$("mostrarModelo");
    checkModelo.addEventListener("change", main);
    var checkPrecio = Main.$("mostrarPrecio");
    checkPrecio.addEventListener("change", main);
    var mostrarTipo = Main.$("selectTipo");
    mostrarTipo.addEventListener("change", main);
    var btnPromedio = Main.$("btnCalcularProm");
    btnPromedio.addEventListener("click", main);
});
var Main = /** @class */ (function () {
    function Main() {
        this.listaVehiculos = new Array();
    }
    Main.prototype.handleEvent = function (evt) {
        var target = evt.target;
        switch (target.id) {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
            case "NselectTipo":
                this.MostrarTipo();
                break;
            case "btnGuardar":
                this.GuardarNuevo();
                break;
            case "mostrarId":
            case "mostrarMarca":
            case "mostrarModelo":
            case "mostrarPrecio":
                this.CargarLista();
                break;
            case "selectTipo":
                this.CargarPorTipo();
                break;
            case "btnCalcularProm":
                this.CalcularPromedio();
                break;
            default:
                if (target.className == "btnEliminar") {
                    this.Eliminar(evt);
                }
                break;
        }
    };
    Main.$ = function (id) {
        return document.getElementById(id);
    };
    Main.prototype.Agregar = function () {
        this.AbrirGrilla();
    };
    Main.prototype.CargarPorTipo = function () {
        var listaAux;
        var seleccion = Main.$("selectTipo").value;
        if (seleccion == "auto") {
            listaAux = this.listaVehiculos.filter(function (item) { return item instanceof Auto; });
            this.CargarLista(listaAux);
        }
        else if (seleccion == "camioneta") {
            listaAux = this.listaVehiculos.filter(function (item) { return item instanceof Camioneta; });
            this.CargarLista(listaAux);
        }
        else {
            this.CargarLista(this.listaVehiculos);
        }
        Main.$("promedio").value = "";
    };
    Main.prototype.CalcularPromedio = function () {
        var seleccion = Main.$("selectTipo").value;
        var promedio;
        var contador = 0;
        var resultado;
        if (seleccion == "auto") {
            promedio = this.listaVehiculos.filter(function (item) { return item instanceof Auto; }).reduce(function (total, item) {
                contador++;
                return total += item.precio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else if (seleccion == "camioneta") {
            promedio = this.listaVehiculos.filter(function (item) { return item instanceof Camioneta; }).reduce(function (total, item) {
                contador++;
                return total += item.precio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else {
            promedio = this.listaVehiculos.reduce(function (total, item) {
                contador++;
                return total += item.precio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
    };
    Main.prototype.CargarLista = function (lista) {
        var _this = this;
        var cabecera = Main.$("tCabecera");
        while (cabecera.hasChildNodes()) {
            cabecera.removeChild(cabecera.lastChild);
        }
        var cuerpo = Main.$("tCuerpo");
        while (cuerpo.hasChildNodes()) {
            cuerpo.removeChild(cuerpo.lastChild);
        }
        if (lista != null) {
            if (lista.length > 0) {
                var cargarHead_1 = 0;
                lista.forEach(function (vh) {
                    if (cargarHead_1 == 0) {
                        _this.CargarVh(vh, 1);
                        cargarHead_1 = 1;
                    }
                    else {
                        _this.CargarVh(vh);
                    }
                });
            }
        }
        else {
            if (this.listaVehiculos.length > 0) {
                var cargarHead_2 = 0;
                this.listaVehiculos.forEach(function (vh) {
                    if (cargarHead_2 == 0) {
                        _this.CargarVh(vh, 1);
                        cargarHead_2 = 1;
                    }
                    else {
                        _this.CargarVh(vh);
                    }
                });
            }
        }
    };
    Main.prototype.GuardarNuevo = function () {
        var marca = Main.$("marca").value;
        var modelo = Main.$("modelo").value;
        var precio = parseInt(Main.$("precio").value);
        var seleccion = Main.$("NselectTipo").value;
        if (seleccion == "auto") {
            var puertas = parseInt(Main.$("cantidadPuertas").value);
            var aux = new Auto(this.UltimoIdDisponible(), marca, modelo, precio, puertas);
            this.CargarVh(aux);
            this.listaVehiculos.push(aux);
        }
        else if (seleccion == "camioneta") {
            if (Main.$("tipoCamioneta").value == "si") {
                var aux = new Camioneta(this.UltimoIdDisponible(), marca, modelo, precio, true);
                this.CargarVh(aux);
                this.listaVehiculos.push(aux);
            }
            else if (Main.$("tipoCamioneta").value == "no") {
                var aux = new Camioneta(this.UltimoIdDisponible(), marca, modelo, precio, false);
                this.CargarVh(aux);
                this.listaVehiculos.push(aux);
            }
        }
        this.CerrarGrilla();
    };
    Main.prototype.UltimoIdDisponible = function () {
        if (this.listaVehiculos.length > 0) {
            var idDisponible = this.listaVehiculos.reduce(function (idMax, vh) {
                if (vh.id > idMax) {
                    return vh.id;
                }
                else {
                    return idMax;
                }
            }, 0);
            idDisponible++;
            return idDisponible;
        }
        return 1;
    };
    Main.prototype.ListaInicial = function () {
        if (localStorage.length == 0) {
            var au1 = new Auto(this.UltimoIdDisponible(), "Ford", "Mondeo", 502120, 4);
            this.listaVehiculos.push(au1);
            var au2 = new Auto(this.UltimoIdDisponible(), "Fiat", "Palio", 305224, 5);
            this.listaVehiculos.push(au2);
            var au3 = new Auto(this.UltimoIdDisponible(), "Fiat", "Siena", 402120, 4);
            this.listaVehiculos.push(au3);
            var au4 = new Auto(this.UltimoIdDisponible(), "Vw", "Fox", 705822, 3);
            this.listaVehiculos.push(au4);
            var ca1 = new Camioneta(this.UltimoIdDisponible(), "Vw", "Amarok", 805562, true);
            this.listaVehiculos.push(ca1);
            var ca2 = new Camioneta(this.UltimoIdDisponible(), "Ford", "Ranger", 1205562, false);
            this.listaVehiculos.push(ca2);
            var ca3 = new Camioneta(this.UltimoIdDisponible(), "Rover", "Range", 2105562, true);
            this.listaVehiculos.push(ca3);
            var ca4 = new Camioneta(this.UltimoIdDisponible(), "Doogge", "Ram", 2505562, true);
            this.listaVehiculos.push(ca4);
        }
        this.CargarLista();
    };
    Main.prototype.EliminarId = function (id) {
        for (var i = 0; i < this.listaVehiculos.length; i++) {
            if (this.listaVehiculos[i].id == id) {
                this.listaVehiculos.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Main.prototype.Eliminar = function (ev) {
        var _a, _b, _c;
        var elemento = ev.target;
        var tcuerpo = Main.$("tCuerpo");
        if (Main.$("mostrarId").checked) {
            var id = parseInt((_b = (_a = elemento.parentElement) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.childNodes.item(0).textContent);
            if (this.EliminarId(id)) {
                tcuerpo.removeChild((_c = elemento.parentElement) === null || _c === void 0 ? void 0 : _c.parentNode);
            }
        }
        else {
            alert("Debe seleccionar la casilla de ID para eliminar");
        }
    };
    Main.prototype.Mostrar = function () {
        console.log("entro");
    };
    Main.prototype.AbrirGrilla = function () {
        Main.$("contGrilla").style.display = "block";
        var campoMarca = Main.$("marca");
        campoMarca.value = "";
        var campoModelo = Main.$("modelo");
        campoModelo.value = "";
        var campoPrecio = Main.$("precio");
        campoPrecio.value = "";
    };
    Main.prototype.CerrarGrilla = function () {
        Main.$("contGrilla").style.display = "none";
    };
    Main.prototype.MostrarTipo = function () {
        var tipo = Main.$("NselectTipo");
        if (tipo.value == "auto") {
            Main.$("fAuto").style.display = "block";
            Main.$("fCamioneta").style.display = "none";
        }
        else if (tipo.value == "camioneta") {
            Main.$("fCamioneta").style.display = "block";
            Main.$("fAuto").style.display = "none";
        }
    };
    Main.prototype.CargarVh = function (vh, cargarHead) {
        var tCabecera = Main.$("tCabecera");
        var tCuerpo = Main.$("tCuerpo");
        var tr = document.createElement("tr");
        var th = document.createElement("tr");
        var selecciono = 0;
        if (Main.$("mostrarId").checked) {
            if (this.listaVehiculos.length == 0 || cargarHead) {
                var thId = document.createElement("th");
                th.appendChild(thId);
                var nodoThId = document.createTextNode("Id");
                thId.appendChild(nodoThId);
            }
            var tdId = document.createElement("td");
            tr.appendChild(tdId);
            var nodoTdId = document.createTextNode(vh.id.toString());
            tdId.appendChild(nodoTdId);
            selecciono = 1;
        }
        if (Main.$("mostrarMarca").checked) {
            if (this.listaVehiculos.length == 0 || cargarHead) {
                var thMarca = document.createElement("th");
                th.appendChild(thMarca);
                var nodoThMarca = document.createTextNode("Marca");
                thMarca.appendChild(nodoThMarca);
            }
            var tdMarca = document.createElement("td");
            tr.appendChild(tdMarca);
            var nodoTdMarca = document.createTextNode(vh.marca);
            tdMarca.appendChild(nodoTdMarca);
            selecciono = 1;
        }
        if (Main.$("mostrarModelo").checked) {
            if (this.listaVehiculos.length == 0 || cargarHead) {
                var thModelo = document.createElement("th");
                th.appendChild(thModelo);
                var nodoThModelo = document.createTextNode("Modelo");
                thModelo.appendChild(nodoThModelo);
            }
            var tdModelo = document.createElement("td");
            tr.appendChild(tdModelo);
            var nodoModelo = document.createTextNode(vh.modelo);
            tdModelo.appendChild(nodoModelo);
            selecciono = 1;
        }
        if (Main.$("mostrarPrecio").checked) {
            if (this.listaVehiculos.length == 0 || cargarHead) {
                var thPrecio = document.createElement("th");
                th.appendChild(thPrecio);
                var nodoThPrecio = document.createTextNode("Precio");
                thPrecio.appendChild(nodoThPrecio);
            }
            var tdPrecio = document.createElement("td");
            tr.appendChild(tdPrecio);
            var nodoTdPrecio = document.createTextNode(vh.precio.toString());
            tdPrecio.appendChild(nodoTdPrecio);
            selecciono = 1;
        }
        if (selecciono == 1) {
            if (this.listaVehiculos.length == 0 || cargarHead) {
                var thEliminar = document.createElement("th");
                th.appendChild(thEliminar);
                var nodoEliminar = document.createTextNode("Accion");
                thEliminar.appendChild(nodoEliminar);
            }
            var tdEliminar = document.createElement("td");
            tr.appendChild(tdEliminar);
            var anclaEliminar = document.createElement("button");
            tdEliminar.appendChild(anclaEliminar);
            anclaEliminar.className = "btnEliminar";
            var textoAncha = document.createTextNode("Eliminar");
            anclaEliminar.appendChild(textoAncha);
            anclaEliminar.addEventListener("click", this);
        }
        tCabecera === null || tCabecera === void 0 ? void 0 : tCabecera.appendChild(th);
        tCuerpo === null || tCuerpo === void 0 ? void 0 : tCuerpo.appendChild(tr);
    };
    return Main;
}());
