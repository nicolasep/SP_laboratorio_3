class Funciones
{
    public static $(id:string):HTMLElement
    {
        return <HTMLElement>document.getElementById(id);
    }
    public static validarPalabra(marca:string,campo:string)
    {
        if (marca.length <= 3) 
        {
            Funciones.$(campo).className="conError";
            alert("Debe ingresar "+campo.toString());
            Funciones.$(campo).focus();
            
            return false;
        }
        
        Funciones.$(campo).className="sinError";
        return true;
    }  
}