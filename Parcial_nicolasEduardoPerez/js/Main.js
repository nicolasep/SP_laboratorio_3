"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    main.ListaInicial();
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);
    var btnCancelar = document.getElementById("btnCancelar");
    btnCancelar.addEventListener("click", main);
    var btnTipo = document.getElementById("NselectTipo");
    btnTipo.addEventListener("change", main);
    var btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", main);
    var checkId = document.getElementById("mostrarId");
    checkId.addEventListener("click", main);
    var checkMarca = document.getElementById("mostrarMarca");
    checkMarca.addEventListener("click", main);
    var checkModelo = document.getElementById("mostrarModelo");
    checkModelo.addEventListener("click", main);
    var checkPrecio = document.getElementById("mostrarPrecio");
    checkPrecio.addEventListener("click", main);
    var selecTipo = document.getElementById("selectTipo");
    selecTipo.addEventListener("change", main);
    var btnPromedio = document.getElementById("btnCalcularProm");
    btnPromedio.addEventListener("click", main);
});
var Main = /** @class */ (function () {
    function Main() {
        this.listaVehiculos = new Array();
    }
    Main.prototype.handleEvent = function (event) {
        var ev = event.target;
        switch (ev.id) {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "NselectTipo":
                this.MostrarTipo();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
                break;
            case "btnGuardar":
                this.Agregar();
                break;
            case "mostrarId":
            case "mostrarMarca":
            case "mostrarModelo":
            case "mostrarPrecio":
                this.CargarLista();
                break;
            case "selectTipo":
                this.MostrarTipoSeleccionado();
                break;
            case "btnCalcularProm":
                this.CalcularPromedio();
                break;
        }
    };
    Main.prototype.Agregar = function () {
        var marca = Funciones.$("marca").value;
        var modelo = Funciones.$("modelo").value;
        var precio = Funciones.$("precio").value;
        var vhAux;
        var seleccion = Funciones.$("NselectTipo");
        if (seleccion.value == "auto") {
            var tipo = Funciones.$("cantidadPuertas").value;
            vhAux = new Auto(this.RecuperarIdDisponible(), marca, modelo, Number(precio), Number(tipo));
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(vhAux.AutoToJSON()));
            this.listaVehiculos.push(vhAux);
            this.CargarVehiculo(vhAux);
        }
        else if (seleccion.value == "camioneta") {
            var tipo = Funciones.$("tipoCamioneta").value;
            if (tipo == "si") {
                vhAux = new Camioneta(this.RecuperarIdDisponible(), marca, modelo, Number(precio), true);
                localStorage.setItem(localStorage.length.toString(), JSON.stringify(vhAux.CamionetaToJSON()));
                this.listaVehiculos.push(vhAux);
                this.CargarVehiculo(vhAux);
            }
            else if (tipo == "no") {
                vhAux = new Camioneta(this.RecuperarIdDisponible(), marca, modelo, Number(precio), false);
                localStorage.setItem(localStorage.length.toString(), JSON.stringify(vhAux.CamionetaToJSON()));
                this.listaVehiculos.push(vhAux);
                this.CargarVehiculo(vhAux);
            }
        }
        this.CerrarGrilla();
    };
    Main.prototype.RecuperarIdDisponible = function () {
        var id = 1;
        if (this.listaVehiculos.length > 0) {
            var arrayId_1 = new Array();
            this.listaVehiculos.forEach(function (element) {
                arrayId_1.push(element.GetId);
            });
            id = arrayId_1.reduce(function (idMax, item) {
                if (item > idMax) {
                    return item;
                }
                else {
                    return idMax;
                }
            }, 1);
            id++;
        }
        return id;
    };
    Main.prototype.ListaInicial = function () {
        if (localStorage.length == 0) {
            var au1 = new Auto(this.RecuperarIdDisponible(), "Ford", "Mondeo", 502120, 4);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(au1.AutoToJSON()));
            this.listaVehiculos.push(au1);
            var au2 = new Auto(this.RecuperarIdDisponible(), "Fiat", "Palio", 305224, 5);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(au2.AutoToJSON()));
            this.listaVehiculos.push(au2);
            var au3 = new Auto(this.RecuperarIdDisponible(), "Fiat", "Siena", 402120, 4);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(au3.AutoToJSON()));
            this.listaVehiculos.push(au3);
            var au4 = new Auto(this.RecuperarIdDisponible(), "Vw", "Fox", 705822, 3);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(au4.AutoToJSON()));
            this.listaVehiculos.push(au4);
            var ca1 = new Camioneta(this.RecuperarIdDisponible(), "Vw", "Amarok", 805562, true);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(ca1.CamionetaToJSON()));
            this.listaVehiculos.push(ca1);
            var ca2 = new Camioneta(this.RecuperarIdDisponible(), "Ford", "Ranger", 1205562, false);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(ca2.CamionetaToJSON()));
            this.listaVehiculos.push(ca2);
            var ca3 = new Camioneta(this.RecuperarIdDisponible(), "Rover", "Range", 2105562, true);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(ca3.CamionetaToJSON()));
            this.listaVehiculos.push(ca3);
            var ca4 = new Camioneta(this.RecuperarIdDisponible(), "Doogge", "Ram", 2505562, true);
            localStorage.setItem(localStorage.length.toString(), JSON.stringify(ca4.CamionetaToJSON()));
            this.listaVehiculos.push(ca4);
        }
        this.CargarLista();
    };
    Main.prototype.CerrarGrilla = function () {
        var selecAuto = Funciones.$("contGrilla");
        selecAuto.style.display = "none";
    };
    Main.prototype.MostrarTipo = function () {
        var seleccion = Funciones.$("NselectTipo");
        var selecAuto = Funciones.$("fAuto");
        var selecCamioneta = Funciones.$("fCamioneta");
        if (seleccion.value == "auto") {
            selecAuto.hidden = false;
            selecCamioneta.hidden = true;
        }
        else if (seleccion.value == "camioneta") {
            selecCamioneta.hidden = false;
            selecAuto.hidden = true;
        }
    };
    Main.prototype.MostrarTipoSeleccionado = function () {
        var tipo = Funciones.$("selectTipo").value;
        var listaRetorno;
        if (tipo == "auto") {
            listaRetorno = this.listaVehiculos.filter(function (vh) { return vh instanceof Auto; });
        }
        else if (tipo == "camioneta") {
            listaRetorno = this.listaVehiculos.filter(function (vh) { return vh instanceof Camioneta; });
        }
        Funciones.$("promedio").value = "";
        this.CargarLista(listaRetorno);
    };
    Main.prototype.AbrirGrilla = function () {
        Funciones.$("contGrilla").style.display = "block";
        Funciones.$("marca").value = "";
        Funciones.$("modelo").value = "";
        Funciones.$("precio").value = "";
    };
    Object.defineProperty(Main.prototype, "GetLista", {
        get: function () {
            return this.listaVehiculos;
        },
        enumerable: false,
        configurable: true
    });
    Main.prototype.CargarLista = function (lista) {
        var _this = this;
        var tCuerpo = Funciones.$("tCuerpo");
        while (tCuerpo.hasChildNodes()) {
            tCuerpo.removeChild(tCuerpo.lastChild);
        }
        if (lista != null) {
            lista.forEach(function (vh) {
                _this.CargarVehiculo(vh);
            });
        }
        else {
            if (this.listaVehiculos.length == 0) {
                this.CargarDesdeLocalHost();
            }
            this.listaVehiculos.forEach(function (element) {
                _this.CargarVehiculo(element);
            });
        }
    };
    Main.prototype.CargarDesdeLocalHost = function () {
        for (var i = 0; i <= localStorage.length; i++) {
            var vhAux = JSON.parse(String(localStorage.getItem(i.toString())));
            if (vhAux != null) {
                if (vhAux.cantidadPuertas != null) {
                    var aux = new Auto(vhAux.id, vhAux.marca, vhAux.modelo, vhAux.precio, vhAux.cantidadPuertas);
                    this.listaVehiculos.push(aux);
                }
                else {
                    var aux = new Camioneta(vhAux.id, vhAux.marca, vhAux.modelo, vhAux.precio, vhAux.esCuatroXCuatro);
                    this.listaVehiculos.push(aux);
                }
            }
        }
    };
    Main.prototype.CalcularPromedio = function () {
        var tipo = Funciones.$("selectTipo").value;
        var listaRetorno;
        var contador = 0;
        var total = 0;
        if (tipo == "auto") {
            listaRetorno = this.listaVehiculos.filter(function (vh) { return vh instanceof Auto; }).reduce(function (total, item) {
                contador++;
                total += item.GetPrecio;
                return total;
            }, 0);
            total = listaRetorno / contador;
        }
        else if (tipo == "camioneta") {
            listaRetorno = this.listaVehiculos.filter(function (vh) { return vh instanceof Camioneta; }).reduce(function (total, item) {
                contador++;
                total += item.GetPrecio;
                return total;
            }, 0);
            total = listaRetorno / contador;
        }
        else {
            listaRetorno = this.listaVehiculos.reduce(function (total, item) {
                contador++;
                total += item.GetPrecio;
                return total;
            }, 0);
            total = listaRetorno / contador;
        }
        Funciones.$("promedio").value = total.toString();
    };
    Main.prototype.Eliminar = function (eve) {
        var _a, _b, _c;
        var elemento = eve.target;
        var tcuerpo = Funciones.$("tCuerpo");
        var encontroId = -1;
        //creo una lista auxiliar en la cual guardo los vh para luego volver a cargar el localstorage
        var auxList = new Array();
        if (Funciones.$("mostrarId").checked) {
            var id = (_b = (_a = elemento.parentElement) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.childNodes.item(0).textContent;
            for (var i = 0; i < localStorage.length; i++) {
                var vhAux = JSON.parse(String(localStorage.getItem(i.toString())));
                //cargo los vehiculos en una lista auxiliar
                if (vhAux.cantidadPuertas != null) {
                    var aux = new Auto(vhAux.id, vhAux.marca, vhAux.modelo, vhAux.precio, vhAux.cantidadPuertas);
                    auxList.push(aux);
                }
                else {
                    var aux = new Camioneta(vhAux.id, vhAux.marca, vhAux.modelo, vhAux.precio, vhAux.esCuatroXCuatro);
                    auxList.push(aux);
                }
                if (vhAux != null && vhAux.id == parseInt(id)) {
                    encontroId = i;
                }
            }
            if (encontroId > -1) {
                auxList.splice(encontroId, 1);
                localStorage.clear();
                for (var i = 0; i < auxList.length; i++) {
                    if (auxList[i] instanceof Auto) {
                        var aux = auxList[i];
                        localStorage.setItem(i.toString(), JSON.stringify(aux.AutoToJSON()));
                    }
                    else if (auxList[i] instanceof Camioneta) {
                        localStorage.setItem(i.toString(), JSON.stringify((auxList[i]).CamionetaToJSON()));
                    }
                }
                console.log("se borro el id " + encontroId);
                tcuerpo.removeChild((_c = elemento.parentElement) === null || _c === void 0 ? void 0 : _c.parentNode);
            }
        }
        else {
            alert("Para eliminar debe hacer visible el Id");
        }
    };
    //sin uso
    Main.prototype.AcualizarLista = function (auxList) {
        localStorage.clear();
        console.log("despues de limpiar " + localStorage.length);
        for (var i = 0; i < auxList.length; i++) {
            if (auxList[i] instanceof Auto) {
                var aux = auxList[i];
                localStorage.setItem(i.toString(), JSON.stringify(aux.AutoToJSON()));
            }
            else if (auxList[i] instanceof Camioneta) {
                localStorage.setItem(i.toString(), JSON.stringify((auxList[i]).CamionetaToJSON()));
            }
        }
    };
    Main.prototype.CargarVehiculo = function (vh) {
        // se encarga de limpiar las columnas de la cabezera
        var tCuerpo = Funciones.$("tCuerpo");
        var tCabecera = Funciones.$("tCabecera");
        while (tCabecera.hasChildNodes()) {
            tCabecera.removeChild(tCabecera.lastChild);
        }
        var cargo = 0;
        var tr = document.createElement("tr");
        var thC = document.createElement("tr");
        if (Funciones.$("mostrarId").checked) {
            var th = document.createElement("th");
            thC.appendChild(th);
            var nodoidC = document.createTextNode("Id");
            th.appendChild(nodoidC);
            var tdId = document.createElement("td");
            tr.appendChild(tdId);
            var nodoId = document.createTextNode(vh.GetId.toString());
            tdId.appendChild(nodoId);
            cargo = 1;
        }
        if (Funciones.$("mostrarMarca").checked) {
            var th = document.createElement("th");
            thC.appendChild(th);
            var nodoMarcaC = document.createTextNode("Marca");
            th.appendChild(nodoMarcaC);
            var tdMarca = document.createElement("td");
            tr.appendChild(tdMarca);
            var nodoMarca = document.createTextNode(vh.GetMarca);
            tdMarca.appendChild(nodoMarca);
            cargo = 1;
        }
        if (Funciones.$("mostrarModelo").checked) {
            var th = document.createElement("th");
            thC.appendChild(th);
            var nodoModeloC = document.createTextNode("Modelo");
            th.appendChild(nodoModeloC);
            var tdModelo = document.createElement("td");
            tr.appendChild(tdModelo);
            var nodoModelo = document.createTextNode(vh.GetModelo);
            tdModelo.appendChild(nodoModelo);
            cargo = 1;
        }
        if (Funciones.$("mostrarPrecio").checked) {
            var th = document.createElement("th");
            thC.appendChild(th);
            var nodoPrecioC = document.createTextNode("Precio");
            th.appendChild(nodoPrecioC);
            var tdPrecio = document.createElement("td");
            tr.appendChild(tdPrecio);
            var nodoPrecio = document.createTextNode(vh.GetPrecio.toString());
            tdPrecio.appendChild(nodoPrecio);
            cargo = 1;
        }
        if (cargo == 1) {
            var th = document.createElement("th");
            thC.appendChild(th);
            var nodoAccionC = document.createTextNode("Accion");
            th.appendChild(nodoAccionC);
            var tdEliminar = document.createElement("td");
            tr.appendChild(tdEliminar);
            var anclaEliminar = document.createElement("button");
            tdEliminar.appendChild(anclaEliminar);
            anclaEliminar.setAttribute("href", "#");
            anclaEliminar.setAttribute("id", "btnEliminar");
            var textoEliminar = document.createTextNode("Elimina");
            anclaEliminar.appendChild(textoEliminar);
            anclaEliminar.addEventListener("click", this.Eliminar);
        }
        tCabecera.appendChild(thC);
        tCuerpo.appendChild(tr);
    };
    return Main;
}());
