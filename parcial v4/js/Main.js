"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    main.ListaInicial();
    var btnAgregar = Main.$("btnAgregar");
    btnAgregar.addEventListener("click", main);
    var btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click", main);
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
    var selecTipo = Main.$("gSelect");
    selecTipo.addEventListener("change", main);
    var selecVista = Main.$("selectTipo");
    selecVista.addEventListener("change", main);
    var promedio = Main.$("btnPromedio");
    promedio.addEventListener("click", main);
});
var Main = /** @class */ (function () {
    function Main() {
        this.listaVh = new Array();
    }
    Main.prototype.handleEvent = function (evt) {
        var evento = evt.target;
        switch (evento.id) {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
                break;
            case "btnGuardar":
                this.Guardar();
                break;
            case "mostrarId":
            case "mostrarMarca":
            case "mostrarModelo":
            case "mostrarPrecio":
                this.ModificarColumnas();
                break;
            case "gSelect":
                this.MostrarTipos();
                break;
            case "btnEliminar":
                this.Eliminar(evt);
                break;
            case "selectTipo":
                this.MostrarPorTipo();
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
            //contacto@alkemy.org
        }
    };
    Main.$ = function (id) {
        return document.getElementById(id);
    };
    Main.prototype.AbrirGrilla = function () {
        var grilla = Main.$("contGrilla");
        grilla.style.display = "block";
    };
    Main.prototype.CerrarGrilla = function () {
        var grilla = Main.$("contGrilla");
        grilla.style.display = "none";
    };
    Main.prototype.MostrarPorTipo = function () {
        var tipo = Main.$("selectTipo");
        Main.$("promedio").value = "";
        if (tipo.value == "auto") {
            var aux = this.listaVh.filter(function (item) { return item instanceof Auto; });
            this.ModificarColumnas(aux);
        }
        else if (tipo.value == "camioneta") {
            var aux = this.listaVh.filter(function (item) { return item instanceof Camioneta; });
            this.ModificarColumnas(aux);
        }
        else {
            this.ModificarColumnas();
        }
    };
    Main.prototype.ModificarColumnas = function (lista) {
        var _this = this;
        var cuerpo = Main.$("tCuerpo");
        var cabecera = Main.$("tCabecera");
        while (cabecera.hasChildNodes()) {
            cabecera.removeChild(cabecera.lastChild);
        }
        while (cuerpo.hasChildNodes()) {
            cuerpo.removeChild(cuerpo.lastChild);
        }
        if (lista == null) {
            this.listaVh.forEach(function (element) {
                _this.CargarEnLista(element);
            });
        }
        else {
            lista.forEach(function (element) {
                _this.CargarEnLista(element);
            });
        }
    };
    Main.prototype.MostrarTipos = function () {
        var tipo = Main.$("gSelect");
        if (tipo.value == "auto") {
            Main.$("selectAuto").style.display = "block";
            Main.$("selectCamioneta").style.display = "none";
        }
        else if (tipo.value == "camioneta") {
            Main.$("selectCamioneta").style.display = "block";
            Main.$("selectAuto").style.display = "none";
        }
    };
    Main.prototype.RecuperarUltimoId = function () {
        if (this.listaVh.length > 0) {
            var retorno = this.listaVh.reduce(function (idMax, item) {
                if (item.GetId > idMax) {
                    return item.GetId;
                }
                else {
                    return idMax;
                }
            }, 0);
            retorno++;
            return retorno;
        }
        return 1;
    };
    Main.prototype.Guardar = function () {
        var marca = Main.$("gMarca");
        var modelo = Main.$("gModelo");
        var precio = Main.$("gPrecio");
        var tipo = Main.$("gSelect");
        var ingresoDatos = 0;
        if (marca.value == "") {
            marca.className = "inputGrilla error";
        }
        else {
            marca.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (modelo.value == "") {
            modelo.className = "inputGrilla error";
        }
        else {
            modelo.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (precio.value == "") {
            precio.className = "inputGrilla error";
        }
        else {
            precio.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (tipo.value != "todos" && ingresoDatos == 3) {
            if (tipo.value == "auto") {
                var puertas = Main.$("cantidadPuertas");
                if (puertas.value.length > 0) {
                    var aux = new Auto(this.RecuperarUltimoId(), marca.value, modelo.value, parseInt(precio.value), parseInt(puertas.value));
                    this.listaVh.push(aux);
                    //cargar en la lista
                    this.CargarEnLista(aux);
                    this.CerrarGrilla();
                }
                else {
                    alert("Falta elegir cantidad de puertas");
                }
            }
            else if (tipo.value == "camioneta") {
                var es4x4 = Main.$("selectCuatroXcuatro");
                var noEs = false;
                if (es4x4.value == "es4x4") {
                    noEs = true;
                }
                var aux = new Camioneta(this.RecuperarUltimoId(), marca.value, modelo.value, parseInt(precio.value), noEs);
                this.listaVh.push(aux);
                this.CargarEnLista(aux);
                this.CerrarGrilla();
                //cargar en la lista
            }
        }
        else {
            alert("Falta llenar algun campo");
        }
    };
    Main.prototype.CargarEnLista = function (vh) {
        var tCuerpo = Main.$("tCuerpo");
        var tCabecera = Main.$("tCabecera");
        var trH = document.createElement("tr");
        var tr = document.createElement("tr");
        var seleccionoAlgo = 0;
        if (Main.$("mostrarId").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Id");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.GetId.toString());
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarMarca").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Marca");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.GetMarca);
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarModelo").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Modelo");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.GetModelo);
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarPrecio").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Precio");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.GetPrecio.toString());
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (seleccionoAlgo) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Accion");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var eliminar = document.createElement("button");
            td.appendChild(eliminar);
            eliminar.id = "btnEliminar";
            var nodo = document.createTextNode("Eliminar");
            eliminar.appendChild(nodo);
            eliminar.addEventListener("click", this);
        }
        tCabecera.appendChild(trH);
        tCuerpo.appendChild(tr);
    };
    Main.prototype.EliminarId = function (id) {
        for (var i = 0; i < this.listaVh.length; i++) {
            if (this.listaVh[i].GetId == id) {
                this.listaVh.splice(i, 1);
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
    Main.prototype.CalcularPromedio = function () {
        var seleccion = Main.$("selectTipo").value;
        var promedio;
        var contador = 0;
        var resultado;
        if (seleccion == "auto") {
            promedio = this.listaVh.filter(function (item) { return item instanceof Auto; }).reduce(function (total, item) {
                contador++;
                return total += item.GetPrecio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else if (seleccion == "camioneta") {
            promedio = this.listaVh.filter(function (item) { return item instanceof Camioneta; }).reduce(function (total, item) {
                contador++;
                return total += item.GetPrecio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else {
            promedio = this.listaVh.reduce(function (total, item) {
                contador++;
                return total += item.GetPrecio;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
    };
    Main.prototype.ListaInicial = function () {
        if (this.listaVh.length == 0) {
            var au1 = new Auto(this.RecuperarUltimoId(), "Ford", "Mondeo", 502120, 4);
            this.listaVh.push(au1);
            var au2 = new Auto(this.RecuperarUltimoId(), "Fiat", "Palio", 305224, 5);
            this.listaVh.push(au2);
            var au3 = new Auto(this.RecuperarUltimoId(), "Fiat", "Siena", 402120, 4);
            this.listaVh.push(au3);
            var au4 = new Auto(this.RecuperarUltimoId(), "Vw", "Fox", 705822, 3);
            this.listaVh.push(au4);
            var ca1 = new Camioneta(this.RecuperarUltimoId(), "Vw", "Amarok", 805562, true);
            this.listaVh.push(ca1);
            var ca2 = new Camioneta(this.RecuperarUltimoId(), "Ford", "Ranger", 1205562, false);
            this.listaVh.push(ca2);
            var ca3 = new Camioneta(this.RecuperarUltimoId(), "Rover", "Range", 2105562, true);
            this.listaVh.push(ca3);
            var ca4 = new Camioneta(this.RecuperarUltimoId(), "Doogge", "Ram", 2505562, true);
            this.listaVh.push(ca4);
        }
        this.ModificarColumnas();
    };
    return Main;
}());
