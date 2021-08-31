"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(id, marca, modelo, precio, cantidadPuertas) {
        var _this = _super.call(this, id, marca, modelo, precio) || this;
        _this.cantidadPuertas = cantidadPuertas;
        return _this;
    }
    Auto.prototype.AutoToJSON = function () {
        var aux = _super.prototype.VehiculoToString.call(this).split(" ");
        var jsonAux = { "id": Number(aux[0]), "marca": aux[1], "modelo": aux[2], "precio": Number(aux[3]), "cantidadPuertas": Number(this.cantidadPuertas) };
        return JSON.parse(JSON.stringify(jsonAux));
    };
    return Auto;
}(Vehiculo));
