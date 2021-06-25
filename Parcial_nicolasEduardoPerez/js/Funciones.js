"use strict";
var Funciones = /** @class */ (function () {
    function Funciones() {
    }
    Funciones.$ = function (id) {
        return document.getElementById(id);
    };
    Funciones.validarPalabra = function (marca, campo) {
        if (marca.length <= 3) {
            Funciones.$(campo).className = "conError";
            alert("Debe ingresar " + campo.toString());
            Funciones.$(campo).focus();
            return false;
        }
        Funciones.$(campo).className = "sinError";
        return true;
    };
    return Funciones;
}());
