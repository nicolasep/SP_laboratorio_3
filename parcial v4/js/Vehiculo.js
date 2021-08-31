"use strict";
var Vehiculo = /** @class */ (function () {
    function Vehiculo(id, marca, modelo, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
    Object.defineProperty(Vehiculo.prototype, "GetId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "GetMarca", {
        get: function () {
            return this.marca;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "GetModelo", {
        get: function () {
            return this.modelo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "GetPrecio", {
        get: function () {
            return this.precio;
        },
        enumerable: false,
        configurable: true
    });
    return Vehiculo;
}());
